taskkill /F /IM java.exe

./gradlew clean build -x test

docker-compose build --no-cache