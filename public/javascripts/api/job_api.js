import { NoEmpty, getSessionUser } from './init.js';
const select = () => {
	$('.select-icon').on('click', (e) => {
		var valueIcon = e.currentTarget.children[0].classList[0];
		$("#icon").val(valueIcon);
		$('.popup-with-zoom-anim').magnificPopup("close");
	})
}

const addJob = () => {
	$("#add-job-form").on('submit', (e) => {
		e.preventDefault();
		getSessionUser((state, session) => {
			console.log(session)
			if (state) {
				var inputs = e.target.elements,
		            objData = {};

		        for (let index = 0; index < inputs.length; index++) {
		            var name = e.target.elements[index].name;
		            if (/input/i.test(e.target.elements[index].localName)) {
		            	objData[name] = e.target.elements[index].value;
		            }
		            if (/textarea/i.test(e.target.elements[index].localName)) {
		            	objData[name] = e.target.elements[index].value;
		            }
		        }
		        if (NoEmpty(objData)) {
		        	$.ajax({
				        type: 'POST',
				        url: "/api/admin/job/creation",
				        dataType: "json",
				        data : objData,
				        beforeSend : function () {
				        	$("#btn-add-job").html('<div class="sbl-circ"></div> Création en cours');
				        },
				        success: function(data) {
				        	$("#btn-add-job").html('Valider<i class="icon-material-outline-arrow-right-alt"></i>');
				            if (data.getEtat) {
				            	Snackbar.show({
				                    text: "La creation du metier à reussi",
				                    pos: 'top-center',
				                    showAction: true,
				                    actionText: "Fermer",
				                    duration: 3000,
				                    textColor: '#fff',
				                    backgroundColor: '#3696f5'
				                });
				                setInterval(function () {
				                	window.location.reload();
				                }, 2000)
				            } else {
				            	Snackbar.show({
				                    text: data.getMessage,
				                    pos: 'bottom-center',
				                    showAction: true,
				                    actionText: "Fermer",
				                    duration: 3000,
				                    textColor: '#fff',
				                    backgroundColor: '#ad344b'
				                });
				            }
				        },
				        error: function(err) {
				        	$("#btn-add-job").html('Valider<i class="icon-material-outline-arrow-right-alt"></i>');
				            console.log(err);
				            Snackbar.show({
			                    text: "Aucune connexion! verifiez votre connexion internet",
			                    pos: 'bottom-center',
			                    showAction: true,
			                    actionText: "Fermer",
			                    duration: 3000,
			                    textColor: '#fff',
			                    backgroundColor: '#ad344b'
			                });
				        }
				    });
		        } else {
		        	Snackbar.show({
	                    text:"Veuillez renseigner tous les champs",
	                    pos: 'bottom-center',
	                    showAction: true,
	                    actionText: "Fermer",
	                    duration: 3000,
	                    textColor: '#fff',
	                    backgroundColor: '#ad344b'
	                });
		        }
			} else {
				Snackbar.show({
                    text:"Votre session à expiré, reconnectez-vous",
                    pos: 'top-center',
                    showAction: true,
                    actionText: "Fermer",
                    duration: 3000,
                    textColor: '#fff',
                    backgroundColor: '#ad344b'
                });
			}
		});
		

        
	})
}

const listJobs = () => {
	$.ajax({
		type: 'GET',
		url: "/api/admin/job/listJobs",
		dataType: "json",
		success: function (data) {
			if (data.getEtat) {
				var headContent = `<div class="dashboard-headline">
										<h3>Liste des tous les metiers sur Beniragi-Services (${data.getObjet.length})</h3>
									</div>
									<div class="row">
										<div class="col-xl-12">
											<table class="table table-bordered col-xl-12">
												<thead>
													<tr>
														<th>Icone</th>
														<th>Dénomination</th>
														<th>Description</th>
														<th>Profiles</th>
														<th>Action</th>
													</tr>
												</thead>
												<tbody id="jobsDynamic">
												</tbody>
											</table>
										</div>
									</div>`;

				$("#emptyRequest").html(headContent);

				data.getObjet.map(job => {
					var bodyContent;
					
					if (job.flag) {
						bodyContent = `<tr class="ads">
												<td><center><i style="font-size: 22px;" class="${job.icon}"></i></center></td>
												<td>${job.name}</td>
												<td>${job.describe}</td>
												<td>${job.profil}</td>
												<td>
													<center id="thisJob${job._id}">
														<button class="button ripple-effect" onClick="toggleJob('${job._id}', ${job.flag})"><i class="icon-line-awesome-power-off"></i> Désactiver</button>            
													</center>
												</td>
											</tr>`;
					} else {
						bodyContent = `<tr style="background-color: rgba(229,48,56,0.09);" class="ads">
											<td><center><i style="font-size: 22px;" class="${job.icon}"></i></center></td>
											<td>${job.name}</td>
											<td>${job.describe}</td>
											<td>${job.profil}</td>
											<td>
												<center id="thisJob${job._id}">
													<button style="background-color: green;" class="button ripple-effect" onClick="toggleJob('${job._id}', ${job.flag})"><i class="icon-feather-check"></i> Activer</button>            
												</center>
											</td>
										</tr>`
					}

					$("#jobsDynamic").append(bodyContent);
				})


			} else {
				
			}
		},
		error: function (err) {
			console.log(err);
		}
	});
}


export {select, addJob, listJobs}