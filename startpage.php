<?php 
	session_start(); 

	if (!isset($_SESSION['username'])) {
		$_SESSION['msg'] = "You must log in first";
		header('location: startpage.php');
	}

	if (isset($_GET['logout'])) {
		session_destroy();
		unset($_SESSION['username']);
		header("location: startpage.php");
	}

?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Startpage</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css" integrity="sha384-Zug+QiDoJOrZ5t4lssLdxGhVrurbmBWopoEl+M6BdEfwnCJZtKxi1KgxUyJq13dy" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="CSS/stylesheet.css">
	    <link rel="stylesheet" type="text/css" href="CSS/menu.css" />
</head>
<body style="overflow-y:hidden" >
<nav role="navigation">
    <div id="menuToggle">
      <!--
      A fake / hidden checkbox is used as click reciever,
      so you can use the :checked selector on it.
      -->
      <input type="checkbox"/>
      <span></span>
      <span></span>
      <span></span>
      
      <ul id="menu">
	    <a href="startpage.php"><li class="activemenu">Home</li></a>
        <a href="leaderboard.php"><li>Leaderboard</li></a>
        <a href="#" role="button" data-toggle="modal" data-target="#joinTeam"><li>Join a Team</li></a>
        <a href="#"><li>Settings</li></a>
        <a href="#" role="button" data-toggle="modal" data-target="#rulesAbout"><li>Help</li></a>
         <a href="index.php?logout='1'"><li>logout</li></a> 
      </ul>
    </div>
  </nav>
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
	<div class="content1">

		<!-- notification message -->

	

		<!-- logged in user information -->
		<?php  if (isset($_SESSION['username'])) : ?>
			<p>User: <strong><?php echo $_SESSION['username']; ?></strong></p>
			
		<?php endif ?>
	</div>
    <div class="container-fluid startPageTop">
        <div class="row">
            <div class="col-lg-12">
                <h2 class="text-center mb-3 mt-5">The Amazing Game</h2>

                  <form>
                    <div class="form-group">
                      <div class="input-group">
                      <input type="text" class="white-border col-lg-4 offset-lg-4 form-control" id="teamName" placeholder="Create team">
                        <div class="input-group-append">
                          <button class="btn btn-success1" id="myBtn" type="submit">Create</button>
                      </div>
                    </div>
                  </div>
                  </form>
                  <div class="text-center mb-1" id="emptyField"></div><br>
                </div>
                <br>
                <button class="btn btn-success1 mx-auto d-block mb-5" type="button">Join Team</button>
            </div>
        </div>
    </div>
    <div class="modal fade" id="joinTeam" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="joinTeam">Join a team</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                <input class="col-12 form-control" id="codeInput" type="text" placeholder="Enter code">
                <br/>
                <button type="button" class="btn btn-success m4" id="codeGenerator">Apply code</button>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    <div class="container-fluid" id="startPageBottom">

    </div>

<script src="JS/codeGenerator.js"></script>
<script src="JS/script.js"></script> 
<script src="JS/map.js"></script> 
<script src="JS/createTeam.js"></script> 
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/js/bootstrap.min.js" integrity="sha384-a5N7Y/aK3qNeh15eJKGWxsqtnX/wWdSZSKp+81YjTmS15nvnvxKHuzaWwXHDli+4" crossorigin="anonymous"></script>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCqwpwKirHNR8hapcq0pCHGPq94qjDKBhU&callback=initMap"></script>
</body>
</html>
