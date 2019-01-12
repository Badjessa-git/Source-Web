<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header bg-dark">
        <h5 class="modal-title" id="exampleModalLongTitle">{{this.lastName}} {{this.timeStamp}}</h5>
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
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label for="color">Color</label>
                        <input class="form-control" type="text" name="color" id="color" value="{{this.color}}" readonly/>
                    </div>
                </div>
                <div class="col">
                    <div class="form-group" id="num_copies">
                        <label for="num_copies">Number of Copies</label>
                        <input class="form-control" type="text" name="num_copies" id="num_copies" value="{{this.numCopies}}" readonly/>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="file_upload">File to print</label>
                <p><a href={{this.file}} class="tooltip-test" target="_blank" title="Tooltip">{{this.file}}</a></p>            
            </div>
            <div class="form-group>
                <label for="done">Completed</label>
                <select class="form-control" name="done" id="options">
                    <option value="Completed">Completed</option>
                    <option value="Not Completed">Not Completed</option>
                </select> 
            </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary EntryItem-editbtn">Save changes</button>
      </div>
    </div>
  </div>
</div>