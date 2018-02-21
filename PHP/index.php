<?php

session_start();

?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Team Grape</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css" integrity="sha384-Zug+QiDoJOrZ5t4lssLdxGhVrurbmBWopoEl+M6BdEfwnCJZtKxi1KgxUyJq13dy" crossorigin="anonymous">
  <link rel="stylesheet" type="text/css" href="../CSS/stylesheet.css">
</head>
<body>
  <div class="col-lg-12 col-xs-12 container-fluid v-height img">
    <div class="col-lg-6 col-md-6 mp">
      <img class="col-lg-6 img-fluid center mx-auto d-block" alt="Logotyp" src="../IMG/logo.png"/>
      <div class="text-center">
      <h4>The Amazing Game</h4>
      <a href="#" role="button" data-toggle="modal" data-target="#rulesAbout">About &amp; Rules | </a>
      <a href="#" role="button" data-toggle="modal" data-target="#signup">Signup</a>
    </div>
    </div>
    <div class="bg-color col-lg-6 col-md-6 v-height">
      <div class="row">
        <div class="text-center loginh4">
          <h4>Login</h4>
          <div class="col-lg-12 col-md-12 col-xs-12">
            <div class="vh-height">
            <form action="login.inc.php" method="POST">
              <div class="col-lg-12 form-group">
                <input type="text" name="uid" class="form-control" placeholder="Username" id="username" required>
              </div>
              <div class="col-lg-12 col-sm-12 col-xs-12 form-group">
                <input type="password" name="pwd"  class="form-control" placeholder="Password" id="password" required>
              </div>
			        <button type="submit" name="submit" class="btn btn-success1">Let's play!</button>
              </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

<!-- Modal -->
<div class="modal fade" id="rulesAbout" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="rulesAbout">About &amp; Rules</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <h3>The Amazing Game</h3>
        <h4>About</h4>
        <p class="text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque arcu, auctor at gravida eget, semper sit amet ipsum. Curabitur at odio vel orci pellentesque tincidunt. Nam eget porttitor erat. Nam eu turpis ac velit tincidunt dictum ut dignissim nunc. Quisque ac faucibus est. Phasellus posuere est ac mollis hendrerit. Etiam nisi dolor, sollicitudin id auctor sit amet, tempor sit amet erat. Aliquam pretium mauris faucibus, gravida libero in, euismod mauris. Ut pellentesque, ex id tincidunt consequat, dui magna commodo dolor, vitae pretium purus dui sit amet enim. Mauris dapibus, ligula eget pulvinar iaculis, mi nunc venenatis ante, a finibus velit massa non lectus. Phasellus hendrerit, neque eu scelerisque dignissim, leo mauris molestie ipsum, non feugiat neque tortor tincidunt mi. Praesent maximus orci eget ex sollicitudin ultricies. Curabitur pretium interdum sapien hendrerit cursus. Pellentesque rutrum, est vel mattis pellentesque, massa metus ultricies turpis, a sodales nisl dolor vitae odio. Pellentesque molestie convallis quam, non accumsan dolor. Vestibulum id tempus mauris.</p>
        <h4>Rules</h4>
        <p class="text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque arcu, auctor at gravida eget, semper sit amet ipsum. Curabitur at odio vel orci pellentesque tincidunt. Nam eget porttitor erat. Nam eu turpis ac velit tincidunt dictum ut dignissim nunc. Quisque ac faucibus est. Phasellus posuere est ac mollis hendrerit. Etiam nisi dolor, sollicitudin id auctor sit amet, tempor sit amet erat. Aliquam pretium mauris faucibus, gravida libero in, euismod mauris. Ut pellentesque, ex id tincidunt consequat, dui magna commodo dolor, vitae pretium purus dui sit amet enim. Mauris dapibus, ligula eget pulvinar iaculis, mi nunc venenatis ante, a finibus velit massa non lectus. Phasellus hendrerit, neque eu scelerisque dignissim, leo mauris molestie ipsum, non feugiat neque tortor tincidunt mi. Praesent maximus orci eget ex sollicitudin ultricies. Curabitur pretium interdum sapien hendrerit cursus. Pellentesque rutrum, est vel mattis pellentesque, massa metus ultricies turpis, a sodales nisl dolor vitae odio. Pellentesque molestie convallis quam, non accumsan dolor. Vestibulum id tempus mauris.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="signup" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="signup">Signup</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12 text-center">
              <h3>The Amazing Game</h3>
              <h4>Registration</h4>
              <p>Please enter your registration details below</p>
            </div>
          </div>
       <form action="index.inc.php" method="POST">
          <div class="col-sm-12 col-xs-12">
            <div class="form-group">
              <label for="uName">Username:</label>
              <input type="text" class="form-control" name="uid" placeholder="Enter Username" id="uName" required>
            </div>
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" class="form-control" name="email" placeholder="Enter Email" id="email" required>
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <input type="password" class="form-control" name="pwd" placeholder="Enter Password" id="password" required>
            </div>
            
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="termsAndCondition" required>
              <label class="form-check-label" for="termsAndCondition">I agree to the following <a href="#" role="button" data-toggle="modal" data-target="#exampleModalLong">terms and conditions</a></label>
            </div>
            <button type="submit" name="submit" class="btn btn-default">Submit</button>
        </div>
        </form>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
<script src="JS/script.js"></script>    
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/js/bootstrap.min.js" integrity="sha384-a5N7Y/aK3qNeh15eJKGWxsqtnX/wWdSZSKp+81YjTmS15nvnvxKHuzaWwXHDli+4" crossorigin="anonymous"></script>
<script src="JS/jquery-3.2.1.js"></script>
</body>
</html>
