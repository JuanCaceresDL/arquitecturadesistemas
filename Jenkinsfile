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
                    sh "mvn clean verify sonar:sonar -Dsonar.password= -Dsonar.login=62820ad4186f31e1484c55eddb02a4269812f43f"
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
