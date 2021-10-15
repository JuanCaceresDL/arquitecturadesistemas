pipeline {
    agent any 
    tools{
      maven 'maven'
   }
    stages {
        stage('checkout'){
            steps{
                git 'https://github.com/JuanCaceresDL/arquitecturadesistemas.git'
                }
            }
        stage('unit testing') { 
            steps {
                withMaven(maven: 'maven') {
                sh 'mvn test'
                }
            }
        }
        
        stage('envío de correo') {
            steps {
                emailext body: 'algo salió mal', subject: 'error de pipeline', to: 'juanestebancdl@gmail.com, jflores@unis.edu.gt'
                }
            }
            
        stage('proceso de sonarqube'){
                steps{
                withSonarQubeEnv('sonarqube') {
                    sh "mvn clean verify sonar:sonar -Dsonar.password= -Dsonar.login=5d09143e330c526b157f5bc076ef1a905611c9e9"
                    }
                }
    
        }

        //stage('Deploy') { 
         //   steps {
                // 
           // }
        //}
    }
}
