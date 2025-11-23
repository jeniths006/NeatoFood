# Use official Java 21 image
FROM eclipse-temurin:21-jdk

# Create app directory
WORKDIR /app

# Copy Gradle wrapper & config first (for caching)
COPY gradlew ./
COPY gradle ./gradle
COPY build.gradle .
COPY settings.gradle .

# Give gradlew execute permission
RUN chmod +x gradlew

# Copy the rest of the project
COPY . .

# Build the JAR (inside the container) 
RUN chmod +x gradlew && ./gradlew bootJar --no-daemon


# Run the application with 'render' profile
CMD ["sh", "-c", "java -Dspring.profiles.active=render -jar build/libs/*SNAPSHOT.jar"]
