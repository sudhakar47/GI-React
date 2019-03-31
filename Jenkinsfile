pipeline {
    agent {
        docker {
            image 'node:10.15.3-alpine'
            args '-p 5000:5000'
        }
    }
    stages {
        stage('Build'){
            steps {
                sh 'npm install'
            }
        }
    }
}
