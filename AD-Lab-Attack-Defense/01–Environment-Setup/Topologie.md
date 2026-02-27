## Objectif

Mettre en place une infrastructure Active Directory fonctionnelle dans un environnement réseau segmenté simulant un système d'information d’entreprise.

Cette première phase prépare le lab en déployant uniquement l’infrastructure de base :

- firewall périmétrique
- réseau interne
- contrôleur de domaine
- poste client joint au domaine
- machine attaquante isolée

Aucun mécanisme de détection ou SIEM n’est utilisé à ce stade.

---

## Architecture

---

Le réseau interne représente le système d’information, tandis que le réseau ATTACK simule une zone non fiable.

---

## Plan d’adressage

### LAN — Infrastructure interne

| Machine | Rôle | Adresse IP |
|---|---|---|
| OPNsense | Gateway LAN | 192.168.2.1 |
| DC01 | Domain Controller | 192.168.2.2 |
| CLIENT01 | Poste utilisateur | 192.168.2.10 |

### ATTACK NET — Réseau attaquant

| Machine | Rôle | Adresse IP |
|---|---|---|
| OPNsense | Gateway OPT1 | 192.168.3.1 |
| KALI01 | Machine d’attaque | 192.168.3.10 |

---

## Machines virtuelles

### OPNsense
Firewall assurant la segmentation entre les réseaux.

Interfaces :
- WAN : accès externe (optionnel)
- LAN : réseau interne
- OPT1 : réseau attaquant

---

### DC01 — Windows Server 2025
- Active Directory Domain Services
- DNS
- Domaine : `lab.local`

---

### CLIENT01 — Windows 10
- Poste utilisateur joint au domaine
- Utilisé pour générer de l’activité légitime.
---

## Organisation Active Directory

L’Active Directory est structuré de manière simple afin de représenter
une organisation d’entreprise classique et faciliter les scénarios
d’attaque et d’analyse.

Chaque service dispose de sa propre unité organisationnelle (OU)
contenant les utilisateurs, groupes et ordinateurs associés.

Structure mise en place :

- OU_Comptabilite
- OU_IT
- OU_RH

Chaque OU contient :
- un dossier **Utilisateurs**
- un dossier **Groupes**
- un dossier **Ordinateurs**

Cette organisation permet :
- d’appliquer des stratégies de groupe ciblées (GPO)
- de simuler des délégations d’administration
- de reproduire des cas réalistes d’élévation de privilèges

Capture d’écran de la structure :

![Organisation Active Directory](Images/AGDLP.png)


---

### KALI01
Machine utilisée pour simuler des attaques provenant d’un réseau distinct.

---

## Objectif de validation

À la fin de cette phase :

- le domaine Active Directory est opérationnel
- le client est joint au domaine
- la communication réseau fonctionne via OPNsense
- la segmentation réseau est en place

Des captures d’écran seront ajoutées progressivement.
