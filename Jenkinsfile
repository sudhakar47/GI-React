pipeline {
  agent none
  stages {
    stage('dockerfile Install') {
      agent {
        dockerfile true
      }
      steps {
        sh 'npm --version'
        sh 'node --version'
      }
    }
    stage('Docker Build') {
      agent any
      steps {
        sh 'docker build -t shanem:latest .'
      }
    }
  }
}

