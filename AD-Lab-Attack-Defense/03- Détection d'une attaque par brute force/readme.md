# Phase 3 — Détection d’une attaque par brute force RDP

## Objectif

Simuler une attaque par brute force sur un service RDP afin d’observer les traces générées dans les journaux Windows et valider la configuration d’audit mise en place lors de la phase précédente.

Cette phase se concentre uniquement sur la **détection** et l’analyse des événements de sécurité.

---

## Contexte

Après la mise en place de l’infrastructure Active Directory (Phase 1) et l’activation des audits avancés (Phase 2), une machine attaquante Kali Linux est utilisée pour simuler des tentatives d’authentification malveillantes.

Cible :
- DC01 — 192.168.2.2
- Service : RDP (TCP 3389)

Machine attaquante :
- KALI01 — 192.168.3.10

---

## Étape 1 — Découverte du service

Vérification de l’exposition du service RDP depuis le réseau attaquant.

Commande :

```bash
nmap port et l'ip
```

Résultat attendu :
- port 3389 ouvert
- service ms-wbt-server détecté

Screenshot à placer :
Images/nmap-rdp-open.png

---

## Étape 2 — Simulation d’un brute force RDP

Utilisation de kali pour simuler plusieurs tentatives d’authentification.

Objectif :
- générer plusieurs échecs d’authentification
- observer la génération d’événements de sécurité Windows

Résultat observé :
- multiples tentatives échouées
- découverte d’un mot de passe valide

Screenshot à placer :
Images/hydra-success.png

---

## Étape 3 — Analyse des journaux Windows

Analyse via l’Observateur d’événements :

Chemin :
Observateur d’événements → Journaux Windows → Sécurité

Événements observés :

- 4625 — Échec de connexion
- 4624 — Connexion réussie
- 4776 — Validation des identifiants

Comportement identifié :
- succession rapide d’échecs d’authentification
- suivie d’une authentification réussie
- origine réseau : machine Kali

Screenshot à placer :
Images/eventviewer-bruteforce.png

---

## Analyse

Cette simulation démontre que :

- les politiques d’audit fonctionnent correctement
- une attaque brute force laisse une empreinte claire dans les logs
- la corrélation temporelle permet d’identifier une attaque automatisée

Indices détectables :
- grand nombre d’Event ID 4625
- même compte ciblé
- source réseau identique
- réussite finale après plusieurs échecs

---

## Conclusion

L’environnement permet désormais :

- d’identifier une tentative d’attaque par brute force
- d’analyser les journaux de sécurité Windows
- de préparer la mise en place d’une réponse automatisée

La phase suivante introduira des mécanismes de réponse afin de bloquer automatiquement ce type de comportement.

---

## Objectif de validation

À la fin de cette phase :

- une attaque brute force est simulée
- les événements de sécurité sont générés
- les logs permettent d’identifier clairement l’attaque
- les captures d’écran documentent la détection
