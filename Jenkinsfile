pipeline {
   agent {
        docker {
            image 'node:10.15.3-alpine'
            args '-p 1000:1000'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
      stage('Deliver') {
            steps {
                sh 'npm start'
            }
        }
    }
}

