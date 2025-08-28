@echo off
echo.
echo SATURN V1.1 - CONSTRUCTION CORRIGÉE
echo ===================================
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
echo Configuration GitHub : LoupFr/Saturn
echo Taille : ~150-200 MB (FFmpeg inclus)
echo.
echo CORRECTIONS APPORTÉES :
echo ======================
echo ✅ Configuration GitHub : LoupFr/Saturn
echo ✅ Traductions corrigées dans toutes les langues
echo ✅ Emoji anglais restauré : 🍔
echo ✅ Gestion d'erreurs améliorée pour les mises à jour
echo ✅ Messages d'erreur plus clairs
echo ✅ Interface paramètres complètement traduite
echo.
echo VOTRE SATURN V1.1 CORRIGÉ EST PRÊT !
echo ===================================
echo Allez dans : dist\Saturn-win32-x64\
echo Lancez : Saturn.exe
echo Partagez : Tout le dossier Saturn-win32-x64
echo.
echo Système de mise à jour configuré pour : LoupFr/Saturn

pause
