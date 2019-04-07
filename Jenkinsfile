pipeline {
  agent none
  stages {
    stage('dockerfile Install and test npm') {
      agent {
        dockerfile true
      }
      steps {
        sh 'npm --version'
        sh 'node --version'
      }
    }
    stage('Docker Build and run') {
      agent any
      steps {
        sh 'docker build -t shanem:latest .'
        sh 'docker run -d -p 5000:5000 --name godrej shanem:latest'
      }
    }
  }
}

