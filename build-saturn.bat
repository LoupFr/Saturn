@echo off
echo.
echo SATURN V1.1 - CONSTRUCTION AVEC MISE À JOUR
echo ==========================================
echo.

if not exist "assets\icon.ico" (
    echo Pas d'icône personnalisée détectée
    echo L'application utilisera l'icône par défaut d'Electron
    echo.
    echo Pour ajouter une icône :
    echo 1. Placez votre fichier icon.ico dans assets\
    echo 2. Relancez ce script
    echo.
)

echo Installation des dépendances...
call npm install
if errorlevel 1 (
    echo Erreur installation
    pause
    exit /b 1
)

echo.
echo Construction de Saturn...
call npm run package
if errorlevel 1 (
    echo Erreur construction
    pause
    exit /b 1
)

echo.
echo SATURN V1.1 CRÉÉ AVEC SUCCÈS !
echo.
echo Application : dist\Saturn-win32-x64\Saturn.exe
echo Nom : Saturn
echo Taille : ~150-200 MB (FFmpeg inclus)
echo.
echo NOUVEAUTÉS V1.1 :
echo ================
echo ⚙️ Page Paramètres avec bouton en haut à gauche
echo 📋 Informations de version et patch notes
echo 🔄 Système de mise à jour automatique intégré
echo 🗑️ Bouton de désinstallation avec confirmation
echo 📡 Vérification des updates depuis GitHub
echo 🌐 Interface mise à jour dans toutes les langues
echo.
echo VOTRE SATURN V1.1 EST PRÊT !
echo ===========================
echo Allez dans : dist\Saturn-win32-x64\
echo Lancez : Saturn.exe
echo Partagez : Tout le dossier Saturn-win32-x64
echo.
echo ⚠️ IMPORTANT pour les mises à jour :
echo 1. Créez un repository GitHub (voir instructions)
echo 2. Modifiez le fichier main.js avec votre repo
echo 3. Publiez les releases sur GitHub
echo.
echo Interface complète avec paramètres et auto-update

pause
