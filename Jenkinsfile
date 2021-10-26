pipeline {
    agent any 
    tools{
      maven 'maven'
   }
    stages {
        stage('checkout'){
            steps{
                echo env.GIT_BRANCH
                echo env.BRANCH_NAME
                checkout scm
                }
            }
        stage('unit testing') { 
            steps {
                withMaven(maven: 'maven') {
                sh 'mvn test'
                }
            }
        }
        
        
        stage('proceso de sonarqube'){
                steps{
                withSonarQubeEnv('sonarqube') {
                    sh "mvn clean verify sonar:sonar -Dsonar.password= -Dsonar.login=5d09143e330c526b157f5bc076ef1a905611c9e9"
                    }
                }
    
        }

        stage("Quality Gate"){
                steps {
                    script {
                            timeout(time: 1, unit: 'HOURS') {
                            def qg = waitForQualityGate()
                            if (qg.status != 'OK') {

                               error "Pipeline aborted due to quality gate failure: ${qg.status}"
                                }
                            }
                        }
                    }
                }
        stage("Compile WAR file") {
            steps{
             withMaven(maven: 'maven') {
                  sh "mvn -Dspring.profiles.active=main clean install"
                  sh "mvn -Dspring.profiles.active=main package"
                }
            }    
        }

        stage('Deploy to Tomcat') {
            steps {
            sh 'cd target/'
            deploy adapters: [tomcat9(credentialsId: 'efd1443a-a9d5-43ce-941b-78e8aaf77fab', path: '', url: ' http://b90a-190-148-78-2.ngrok.io')], contextPath: "main", war: '**/*.war'
           }
        }     
    }
    post{
          failure{

              mail bcc: '',
              body: "Project: ${currentBuild.currentResult} Job: ${env.JOB_NAME} URL: ${env.BUILD_URL} Buil Number: ${env.BUILD_NUMBER}", 
              cc: '', 
              from: '', replyTo: '',
              subject: 'Pipeline fail', 
               to: 'caceres181049@unis.edu.gt, jflores@unis.edu.gt'
              slackSend(channel: "arquitectura", color: '#ff0000', message: "Project: ${currentBuild.currentResult} Job: ${env.JOB_NAME} URL: ${env.BUILD_URL} Buil Number: ${env.BUILD_NUMBER}")
                   }
        success{
            mail bcc: '',
              body: "Project: ${currentBuild.currentResult} Job: ${env.JOB_NAME} URL: ${env.BUILD_URL} Buil Number: ${env.BUILD_NUMBER}", 
              cc: '', 
              from: '', replyTo: '',
              subject: 'Pipeline success', 
               to: 'caceres181049@unis.edu.gt, jflores@unis.edu.gt'
              slackSend(channel: "arquitectura", color: '#008f39', message: "Project: ${currentBuild.currentResult} Job: ${env.JOB_NAME} URL: ${env.BUILD_URL} Buil Number: ${env.BUILD_NUMBER}")
            }

         }
 
}
