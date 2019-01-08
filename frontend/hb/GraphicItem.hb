<div class="modal fade" id="exampleModalCenter2" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle2" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header bg-dark">
        <h5 class="modal-title" id="exampleModalLongTitle2">{{this.club}} - {{this.timeStamp}}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <form name="printjob" class="main-form">
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label for="firstname">Firstname</label>
                        <input class="form-control" type="text" name="firstname" id="firstname" value="{{this.firstName}}" readonly/>
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label for="lastname">Lastname</label>
                        <input class="form-control" type="text" name="lastname" id="lastname" value="{{this.lastName}}" readonly/>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input class="form-control" type="text" name="email" id="email" value="{{this.email}}" readonly/>
            </div>
            <div class="form-group">
                <label for="club_orgs">Club/Orgnization</label>
                <input class="form-control" type="text" name="club_orgs" id="club_orgs" value="{{this.club}}" readonly/>
            </div>
            <div class="form-group">
                <label for="eventDets">Event Details</label>
                <input class="form-control" type="text" name="eventDets" id="eventDets" maxlength="524288" value="{{this.eventDetails}}" readonly/>
            </div>
            <div class="form-group" id="eventDead">
                <label for="eventDead">Event Deadline</label>
                <input class="form-control" type="text" name="eventDead" id="eventDead" value="{{this.eventDeadline}}" readonly/>
            </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary GraphicItem-editbtn">Save changes</button>
      </div>
    </div>
  </div>
</div>