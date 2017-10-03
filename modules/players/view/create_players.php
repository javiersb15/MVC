<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.form/3.51/jquery.form.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/dropzone/4.0.1/min/dropzone.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/dropzone/4.0.1/dropzone.css">
<!-- Script with absolute route -->
<script type="text/javascript" src="/servidor/project/modules/players/view/js/players.js" ></script>
<section id="contact-page">
    <div class="container">
        <div class="center">
            <h2>ADD PLAYER</h2>
            <p class="lead">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div class="row contact-wrap">
            <div class="status alert alert-success" style="display: none"></div>

            <form id="form_players" name="form_players"><!---->
                <div class ="form-group">
                    <input type="hidden" name="alta_players" value="alta_players">
                </div>
                <div class="col-sm-5 col-sm-offset-1">
                    <div class="form-group">
                        <label>Name *</label>
                        <input type="text" id="name" name="name" placeholder="name" class="form-control" value="" required="required">
                        <div id="e_name"></div>
                    </div>
                    <br />
                    <div class="form-group">
                        <label>Last Name *</label>
                        <input type="text" id="last_name" name="last_name" placeholder="last name" value="" class="form-control" required="required">

                        <div id="e_last_name"></div>
                    </div>
                    <br />
                    <div class="form-group">
                        <label>Date of Birth *</label><br />
                        <input id="birth_date" type="text" name="birth_date"   class="form-control" value="" placeholder="mm/dd/yyyy" >
                        <div id="e_birth_date"></div>
                    </div>
                    <br />
                    <div class="form-group">
                        <label>Height*</label><br />
                        <input id="height" type="text" name="height" placeholder="Height" required="required" value="" class="form-control">
                        <div id="e_height"></div>
                    </div>
                    <br />
                    <div class="form-group">
                        <label>Weight*</label><br />
                        <input id="weight" type="text" name="weight" placeholder="Weight" required="required" value="" class="form-control">
                        <div id="e_weight"></div>
                    </div>
                    <br />
                    <div class="form-group">
                        <label>Select team</label><br />
                        <select name="team" id="team">
                            <option value ="Select team" selected>Select team</option>
                            <option value="Valencia">Valencia</option>
                            <option value="Barcelona">Barcelona</option>
                            <option value="Real Madrid">Real Madrid</option>
                            <option value="Atletico Madrid">Atletico Madrid</option>
                            <option value="Sevilla">Sevilla</option>
                        </select>
                        <div id="e_sel_team"></div>
                    </div>

                </div>
                <div class="col-sm-5">
                    <div class="form-group">
                        <label>User *</label>
                        <input type="text" id="user" name="user" placeholder="user" class="form-control" value="" required="required" >
                        <div id="e_user"></div>
                    </div>
                    <br />
                    <div class="form-group">
                        <label>Password *</label>
                        <input type="password" id="pass" name="pass" placeholder="pass" class="form-control" value="" required="required">
                        <div id="e_pass"></div>
                    </div>
                    <br />
                    <div class="form-group">
                        <label>E-mail *</label>
                        <input type="email" id="email" name="email" placeholder="e-mail" class="form-control" value="" required="required" >
                        <div id="e_email"></div>
                    </div>
                    <br />
                    <div class="form-group">
                        <label>Position  *</label><br>

                        Goalkeeper <input type="checkbox" name="position[]" class="messageCheckbox" value="Goalkeeper">
                        Defender  <input type="checkbox" name="position[]" class="messageCheckbox" value="Defender">
                        Midfielder  <input type="checkbox" name="position[]" class="messageCheckbox" value="Midfielder">
                        Forward   <input type="checkbox" name="position[]" class="messageCheckbox" value="Forward">
                        <div id="e_position"></div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <div class="form-group" id="progress">
                        <div id="bar"></div>
                        <div id="percent">0%</div >
                    </div>

                    <div class="msg"></div>
                    <br/>
                    <div id="dropzone" class="dropzone"></div><br/>
                    <br/>
                    <br/>
                    <br/>

                    <div class="form-group">
                        <button type="button" id="submit_players" name="submit_players" class="btn btn-primary btn-lg" value="submit">Submit Form</button>
                    </div>
                </div>
            </form>
        </div><!--/.row-->
    </div><!--/.container-->
</section><!--/#contact-page-->
