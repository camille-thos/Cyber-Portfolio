# Active Directory – Attaque & Défense

## Objectif

Mettre en place un environnement Active Directory, simuler une attaque de type brute force et construire progressivement des mécanismes de détection et de réponse.

Le lab suit une logique proche d’un environnement réel :

1. Mise en place de l’infrastructure
2. Simulation d’attaque
3. Analyse manuelle
4. Durcissement
5. Centralisation SIEM
6. Automatisation de la réponse

---

## Architecture

- Windows Server 2022 – Contrôleur de domaine
- Windows 10 – Poste client
- Kali Linux – Machine d’attaque
- Wazuh Server – SIEM

Réseau isolé : `192.168.1.0/24`

---

## Phases du lab

- 01 – Environment Setup
- 02 – Attack Simulation
- 03 – Manual Detection
- 04 – Security Hardening
- 05 – SIEM Integration (Wazuh)
- 06 – Automated Response
