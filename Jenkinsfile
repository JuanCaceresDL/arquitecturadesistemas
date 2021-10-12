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
                 def mvnHome =  tool name: 'maven', type: 'maven'
                withSonarQubeEnv('sonarqube') {
                sh "${mvnHome}/bin/mvn verify sonar:sonar -Dsonar.login=admin -Dsonar.password=Blackace1"
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
