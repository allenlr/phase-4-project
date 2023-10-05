# Music Reviewer

Music Reviewer is a web-based application developed as a demonstration 
of learned concepts and skills in Ruby and ActiveRecord. The purpose of the app
is to create an interface that allows users to create and manipulate an account
and its associated album reviews. These capabilities are authenticated through JWTs.

## Requirements

To run this application locally, you'll need:

    Node.js (v14.0.0 or later)
    npm (v6.0.0 or later)

The application has been designed to work with all modern web browsers.

## Installation

1. Clone the Repository: Firstly, you need to clone the repository to your local
machine. You can do this by running the following command in your terminal:
"git clone git@github.com:allenlr/phase-4-project.git"

2. Navigate to the project directory: After cloning the repository, navigate to
the project directory that you cloned to by running:
"cd 'name-of-directory'"

3. Install the dependencies using NPM by running the following in your terminal:
"bundle install" - this will install the gems necessary to run this project,
followed by "npm install --prefix client" - installs the dependancies needed to 
run the frontend

4. After installing the necessary gems and dependancies, you can start the 
backend server by running "rails s" in the terminal and then 
"npm start --prefix client" to start the frontend server


## Configuration

This app does not require any additional configuration outside of the UI.
