<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Entry {{this.timestamp}}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
                <form name="printjob" class="main-form needs-validation" validate>
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label for="firstname">Firstname</label>
                        <input type="text" name="firstname" id="firstname" value={{this.firstName}} class="form-control" readonly/>
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label for="lastname">Lastname</label>
                        <input type="text" name="lastname" id="lastname" value={{this.lastName}} class="form-control" readonly/>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="text" name="email" id="email" value={{this.email}} class="form-control" readonly/>
            </div>
            <div class="form-group">
                <label for="club_orgs">Club/Orgnization</label>
                <input type="text" name="club_orgs" id="club_orgs" value={{this.club}} class="form-control" readonly/>
            </div>
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label for="color">Color</label>
                        <input type="text" name="color" id="color" value={{this.color}} class="form-control" readonly/>
                    </div>
                </div>
                <div class="col">
                    <div class="form-group" id="num_copies">
                        <label for="num_copies">Number of Copies</label>
                        <input type="text" name="num_copies" id="num_copies" value={{this.numCopies}} class="form-control" readonly/>
                        
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="file_upload">File to print</label>
                <a href={{this.file}} class="tooltip-test" title="Tooltip">{{this.file}}</a>            
            </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>