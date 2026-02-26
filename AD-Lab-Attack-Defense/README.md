# Active Directory – Attaque & Défense

## Objectif

Mettre en place un environnement Active Directory, simuler des scénarios d’attaque simples et analyser les événements générés côté contrôleur de domaine.

L’objectif est de comprendre concrètement les traces laissées lors d’une tentative de compromission et d’identifier les axes d’amélioration en matière de détection et de durcissement.

---

## Architecture du lab

- Windows Server 2022 – Contrôleur de domaine (lab.local)
- Windows 10 – Poste client joint au domaine
- Kali Linux – Machine d’attaque

Environnement virtualisé sous VMware.

Captures de l’architecture à venir.

---

## Mise en place

- Installation du rôle AD DS
- Promotion en contrôleur de domaine
- Création de comptes utilisateurs (standard et administrateur)
- Configuration des stratégies d’audit via GPO :
  - Connexions réussies et échouées
  - Modifications de comptes
  - Changements de privilèges

Captures de configuration à venir.

---

## Attaques simulées

### Tentatives de brute force

Simulation de tentatives répétées d’authentification incorrecte sur un compte utilisateur afin de générer des événements d’échec dans les journaux de sécurité.

### Tentative d’accès non autorisé

Essai d’accès à des ressources administratives depuis un compte standard afin d’observer les logs associés.

Captures des tests et des événements à venir.

---

## Logs observés (analyse en cours)

Événements identifiés :

- Event ID 4625 – Échec d’ouverture de session  
- Event ID 4624 – Ouverture de session réussie  
- Event ID 4771 – Échec d’authentification Kerberos  

Premières observations :

La répétition d’Event ID 4625 sur un même compte et depuis une même source constitue un indicateur potentiel de brute force.  
La corrélation entre plusieurs échecs suivis d’un succès mérite une investigation approfondie.

Analyse détaillée des champs (Logon Type, IP source, Workstation Name) à venir.

---

## Mesures mises en place

- Politique de verrouillage de compte après plusieurs tentatives
- Renforcement de la stratégie de mot de passe
- Vérification et limitation des privilèges utilisateurs
- Activation complète des audits de sécurité

---

## Pistes d’amélioration

- Centralisation des logs vers une solution de supervision
- Mise en place d’alertes automatiques
- Ajout de Sysmon pour enrichir la télémétrie
- Corrélation d’événements pour détection plus avancée

---

Lab en cours d’enrichissement et de documentation.
