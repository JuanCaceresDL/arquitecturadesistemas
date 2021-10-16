pipeline {
    agent any 
    tools{
      maven 'maven'
   }
    stages {
        stage('checkout'){
            steps{
                echo GIT_BRANCH 
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
    }
    stage("Compile WAR file") {
            def mvnHome =  tool name: 'M3', type: 'maven'
            sh "${mvnHome}/bin/mvn -Dspring.profiles.active=main package"
        }

        stage('Deploy to Tomcat') {
            sh 'cd target/'
           deploy adapters: [tomcat9(credentialsId: 'tomcat', path: '', url: 'http://127.0.0.1:8080')], contextPath: null, war: '**/*.war'
        }
    post{
          failure{

              mail bcc: '',
              body: "Project: ${currentBuild.currentResult} Job: ${env.JOB_NAME} URL: ${env.BUILD_URL} Buil Number: ${env.BUILD_NUMBER}", 
              cc: '', 
              from: '', replyTo: '',
              subject: 'Pipeline fail', 
               to: 'caceres181049@unis.edu.gt'
                   }
        success{
            mail bcc: '',
              body: "Project: ${currentBuild.currentResult} Job: ${env.JOB_NAME} URL: ${env.BUILD_URL} Buil Number: ${env.BUILD_NUMBER}", 
              cc: '', 
              from: '', replyTo: '',
              subject: 'Pipeline success', 
               to: 'caceres181049@unis.edu.gt'
            }

         }
}
