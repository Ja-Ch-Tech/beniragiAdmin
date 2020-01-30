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

export {select, addJob}