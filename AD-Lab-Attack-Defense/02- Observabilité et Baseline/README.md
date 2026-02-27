# Phase 02 — Observabilité et Baseline

## Objectif

Mettre en place la journalisation de sécurité sur l’environnement Active Directory afin de rendre l’infrastructure observable avant toute simulation d’attaque.

Cette phase vise à établir un comportement normal (baseline) du domaine pour permettre une analyse pertinente lors des phases suivantes.

---

## Contexte

Après la mise en place de l’infrastructure (Phase 01), le domaine Active Directory est fonctionnel mais ne dispose pas encore d’une journalisation exploitable pour l’analyse de sécurité.

Avant de simuler des attaques, il est nécessaire :

- d’activer les stratégies d’audit,
- de vérifier la génération des événements de sécurité,
- d’observer le comportement légitime du système.

---

## Activation des stratégies d’audit

Les audits ont été configurés via une stratégie de groupe appliquée aux contrôleurs de domaine.

### Chemin de configuration

Gestion de stratégie de groupe :

Default Domain Controllers Policy  
→ Configuration ordinateur  
→ Paramètres Windows  
→ Paramètres de sécurité  
→ Configuration avancée de la stratégie d’audit  
→ Stratégies d’audit

### Catégories activées

#### Ouverture de session
- Audit des ouvertures de session : Succès / Échec

#### Gestion des comptes
- Gestion des comptes utilisateurs : Succès

#### Accès aux services d’annuaire
- Accès au service d’annuaire : Succès

#### Utilisation des privilèges
- Utilisation des privilèges sensibles : Succès / Échec

---

## Validation de la journalisation

Les événements ont été vérifiés sur le contrôleur de domaine via :

Observateur d’événements  
→ Journaux Windows  
→ Sécurité

Les événements suivants ont été observés :

- Event ID 4624 — Ouverture de session réussie
- Event ID 4625 — Échec d’authentification
- Event ID 4672 — Attribution de privilèges spéciaux

Ces événements confirment que la télémétrie nécessaire à l’analyse de sécurité est disponible.

---

## Établissement d’une baseline

Une activité légitime a été générée depuis le poste CLIENT01 afin d’observer le comportement normal du domaine :

- ouverture de session utilisateur
- déconnexion / reconnexion
- accès aux ressources du domaine
- administration Active Directory
- trafic réseau interne standard

Cette étape permet de différencier ultérieurement une activité normale d’un comportement suspect.

---

## Captures d’écran

### Configuration des stratégies d’audit

(Capture à ajouter : configuration GPO audit)

![GPO Audit Configuration](./screenshots/gpo_audit.png)

---

### Journaux de sécurité — Event Viewer

(Capture à ajouter : Event ID 4624 / 4625)

![Event Viewer Logs](./screenshots/eventviewer_security.png)

---

## Résultat

L’infrastructure produit désormais des journaux de sécurité exploitables.

Le domaine est prêt pour la phase suivante : simulation d’attaques et analyse des traces générées.
