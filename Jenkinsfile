pipeline {
  agent {
    docker {
      image 'node:8'
    }

  }
  stages {
    stage('build') {
      steps {
        sh 'npm i '
      }
    }
    stage('test') {
      steps {
        sh 'npm test'
      }
    }
  }
}