# Phase 04 — Détection et Réponse Automatisée avec Wazuh

## Objectif

Déployer un SIEM/XDR open source sur l'infrastructure existante afin d'automatiser la détection des comportements suspects et de déclencher des réponses sans intervention manuelle.

Cette phase s'appuie sur les traces identifiées lors des phases précédentes (brute force RDP, authentifications suspectes) pour construire des règles de détection ciblées et des réponses adaptées.

---

## Contexte

Les phases précédentes ont permis de :

- mettre en place une infrastructure AD segmentée (Phase 01)
- activer la journalisation de sécurité et établir une baseline (Phase 02)
- identifier manuellement les traces d'une attaque brute force RDP (Phase 03)

La détection restait jusqu'ici manuelle : consultation de l'Event Viewer, corrélation visuelle des événements.

L'objectif de cette phase est de centraliser les logs, de générer des alertes automatiques et de bloquer les comportements malveillants sans action humaine.

---

## Architecture

Wazuh est déployé en mode manager/agent sur l'infrastructure existante.

| Machine  | Rôle                              | Adresse IP    |
|----------|-----------------------------------|---------------|
| OPNsense | Gateway LAN                       | 192.168.2.1   |
| DC01     | Domain Controller + Agent Wazuh   | 192.168.2.2   |
| CLIENT01 | Poste utilisateur + Agent Wazuh   | 192.168.2.10  |
| WAZUH01  | Wazuh Manager + Dashboard         | 192.168.2.20  |
| KALI01   | Machine d'attaque                 | 192.168.3.10  |

Le manager Wazuh collecte les événements des agents installés sur DC01 et CLIENT01. Le dashboard est accessible depuis le réseau LAN.

(Capture — Dashboard Wazuh, vue d'ensemble des agents connectés)

---

## Installation

### Wazuh Manager (WAZUH01)

Déployé sur une VM Ubuntu Server via le script officiel Wazuh.

Composants installés :
- Wazuh Manager
- Wazuh Indexer
- Wazuh Dashboard

(Capture — Installation Wazuh Manager terminée, services actifs)

### Agents (DC01 / CLIENT01)

Installation de l'agent Wazuh sur chaque machine Windows, enregistrement auprès du manager.

Les agents transmettent les journaux Windows Security au manager en temps réel.

(Capture — Agent Wazuh actif sur DC01, statut connecté)

---

## Configuration

### Collecte des événements Windows

Les agents sont configurés pour remonter les canaux de logs pertinents :

- Security — authentifications, gestion des comptes, privilèges
- System — événements système
- Microsoft-Windows-Sysmon/Operational — si Sysmon est déployé

### Catégories d'événements surveillées

En cohérence avec les audits activés en Phase 02 :

| Event ID | Description                              |
|----------|------------------------------------------|
| 4625     | Échec d'authentification                 |
| 4624     | Ouverture de session réussie             |
| 4776     | Validation des identifiants NTLM         |
| 4672     | Attribution de privilèges spéciaux       |
| 4720     | Création d'un compte utilisateur         |
| 4732     | Ajout d'un membre à un groupe privilégié |

(Capture — Configuration ossec.conf, section localfile pour les logs Windows)

---

## Règles de détection

### Règle 1 — Brute force RDP

Détection d'une succession rapide d'échecs d'authentification depuis une même source, en cohérence avec le scénario simulé en Phase 03.

Déclencheur : plus de 5 Event ID 4625 en moins de 60 secondes depuis la même adresse IP.

Alerte générée :

(Capture — Alerte brute force RDP visible dans le dashboard Wazuh)

### Règle 2 — Authentification réussie après échecs répétés

Détection d'un Event ID 4624 immédiatement après une série de 4625 depuis la même source — indicateur fort de brute force abouti.

Alerte générée :

(Capture — Corrélation des événements 4625 + 4624 dans Wazuh)

### Règle 3 — Création de compte hors baseline

Détection d'un Event ID 4720 en dehors des plages horaires ou depuis un compte non attendu.

Alerte générée :

(Capture — Alerte création de compte dans le dashboard Wazuh)

---

## Réponse automatisée (Active Response)

Wazuh permet de déclencher des scripts de réponse automatiquement lorsqu'une règle atteint un niveau d'alerte défini.

### Réponse 1 — Blocage IP (brute force RDP)

Déclencheur : règle niveau >= 10 sur Event ID 4625 répétés.

Action : ajout d'une règle de blocage sur le firewall OPNsense via l'API, ou via firewall-drop sur la machine cible.

Résultat : l'adresse IP source est bloquée automatiquement pour une durée configurable.

(Capture — Règle de blocage active, IP 192.168.3.10 bloquée)

### Réponse 2 — Désactivation de compte (brute force abouti)

Déclencheur : règle niveau >= 12 — authentification réussie après échecs répétés.

Action : script PowerShell déclenché sur DC01 via l'agent — désactivation du compte ciblé dans Active Directory.

Résultat : le compte compromis est suspendu le temps d'une investigation.

(Capture — Compte désactivé dans Active Directory après déclenchement automatique)

---

## Validation

Le scénario de la Phase 03 est rejoué pour vérifier le bon fonctionnement de la chaîne complète :

1. KALI01 lance un brute force RDP sur DC01
2. Wazuh détecte les Event ID 4625 répétés → alerte niveau 10
3. La réponse automatique se déclenche → IP bloquée
4. La connexion RDP est coupée depuis KALI01
5. L'alerte est visible dans le dashboard Wazuh

(Capture — Vue timeline des alertes dans Wazuh lors du rejeu du scénario)

---

## Limites et pistes d'amélioration

- Les règles de détection sont calibrées sur l'environnement de lab — les seuils seraient à ajuster en production selon la baseline réelle
- L'active response par désactivation de compte peut générer des faux positifs — une analyse complémentaire (SOAR) serait nécessaire avant déploiement en production
- Piste suivante : intégrer Sysmon pour enrichir la télémétrie et détecter des techniques plus avancées (Pass-the-Hash, Kerberoasting)

---

## Conclusion

Cette phase finalise la boucle de sécurité du lab :

- Phase 01 — Infrastructure
- Phase 02 — Observabilité
- Phase 03 — Détection manuelle
- Phase 04 — Détection automatisée + réponse

L'environnement dispose désormais d'une chaîne complète : génération d'activité → collecte des logs → détection → réponse automatique.
