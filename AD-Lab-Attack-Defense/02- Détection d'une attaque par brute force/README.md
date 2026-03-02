# Phase 3 — Détection d’une attaque par brute force

## Objectif

Cette phase consiste à simuler une attaque simple de type brute force sur un environnement Active Directory afin de vérifier la capacité de détection mise en place lors de la phase précédente.

L’objectif est d’observer les traces laissées dans les journaux Windows et d’identifier les indicateurs permettant de détecter une tentative de compromission.

Cette étape marque le passage d’une infrastructure observable à une infrastructure capable de détecter un comportement malveillant.

---

## Environnement

Infrastructure déployée lors des phases précédentes :

- DC01 — Windows Server 2022 (Contrôleur de domaine)
- CLIENT01 — Poste utilisateur joint au domaine
- KALI01 — Machine attaquante isolée
- OPNsense — Segmentation réseau

Domaine Active Directory :

lab.local

Les stratégies d’audit avancées sont actives sur le contrôleur de domaine.

---

## Vérification des audits

Application des stratégies :


gpupdate /force


Vérification de la configuration d’audit :


auditpol /get /category:*


Les catégories liées à l’authentification doivent être configurées en :

Succès et Échec

---

## Simulation de l’attaque

Une série de tentatives d’authentification incorrectes a été réalisée afin de reproduire un comportement de brute force.

Tests réalisés :

- multiples connexions avec mot de passe erroné
- répétition rapide des tentatives
- utilisation d’un compte utilisateur standard

L’objectif est uniquement de générer des événements de sécurité exploitables dans les journaux Windows.

---

## Observation des journaux

Analyse effectuée depuis :

Observateur d’événements  
→ Journaux Windows  
→ Sécurité

### Événements principaux observés

| Event ID | Description |
|---|---|
| 4625 | Échec d’ouverture de session |
| 4771 | Échec d’authentification Kerberos |
| 4624 | Connexion réussie (si compromission simulée) |

---

## Analyse

La multiplication rapide des événements 4625 pour un même compte utilisateur constitue un indicateur fort de tentative de brute force.

La corrélation entre plusieurs échecs successifs suivis éventuellement d’une connexion réussie représente un scénario classique de compromission de compte.

Cette phase permet de comprendre comment une attaque apparaît réellement du point de vue des journaux système.

---

## Optimisation de l’observation

Une console MMC personnalisée a été créée afin de centraliser les outils d’administration utilisés durant l’analyse :

- Observateur d’événements (journal Sécurité)
- Active Directory Users and Computers
- Gestion des stratégies de groupe
- DNS Manager

Cette approche reproduit une méthode d’administration réaliste en regroupant les outils d’analyse dans une interface unique.

---

## Validation de la phase

La phase est considérée comme validée lorsque :

- les tentatives d’authentification génèrent des événements 4625
- les journaux permettent d’identifier clairement l’activité suspecte
- la corrélation entre action réalisée et trace système est confirmée

---

## Résultat

L’environnement Active Directory permet désormais :

- la détection d’échecs d’authentification répétés
- l’identification d’un comportement anormal
- l’analyse des traces laissées par une attaque simple

L’infrastructure est maintenant prête pour la mise en place d’un mécanisme de réponse automatisée.

---

## Phase suivante

Phase 4 — Mise en place d’une réponse de sécurité

Objectifs :

- automatiser la détection
- générer une alerte
- appliquer une mesure corrective (verrouillage ou surveillance renforcée)
