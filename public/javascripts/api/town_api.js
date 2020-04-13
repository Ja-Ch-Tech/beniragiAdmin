const listTown = () => {
    $.ajax({
        type: 'GET',
        url: "/api/admin/town/listTowns",
        dataType: "json",
        success: function (data) {
            if (data.getEtat) {
                var headContent = `<div class="dashboard-headline">
										<h3>Liste des toutes les villes sur Beniragi-Services (${data.getObjet.length})</h3>
									</div>
									<div class="row">
										<div class="col-xl-12">
											<table class="table table-bordered col-xl-12">
												<thead>
													<tr>
														<th>Dénomination</th>
														<th>Utilisateurs</th>
														<th>Action</th>
													</tr>
												</thead>
												<tbody id="townsDynamic">
												</tbody>
											</table>
										</div>
									</div>`;

                $("#emptyRequest").html(headContent);

                data.getObjet.map(town => {
                    var bodyContent;

                    if (town.flag) {
                        bodyContent = `<tr class="ads">
												<td>${town.name}</td>
												<td>${town.profil}</td>
												<td>
													<center id="thisJob${town._id}">
														<button class="button ripple-effect" onClick="toggleTown('${town._id}', ${town.flag})"><i class="icon-line-awesome-power-off"></i> Désactiver</button>            
													</center>
												</td>
											</tr>`;
                    } else {
                        bodyContent = `<tr style="background-color: rgba(229,48,56,0.09);" class="ads">
											<td>${town.name}</td>
											<td>${town.profil}</td>
											<td>
												<center id="thisJob${town._id}">
													<button style="background-color: green;" class="button ripple-effect" onClick="toggleTown('${town._id}', ${town.flag})"><i class="icon-feather-check"></i> Activer</button>            
												</center>
											</td>
										</tr>`;
                    }

                    $("#townsDynamic").append(bodyContent);
                })

            } else {
				var contain = `
                <div class="row">
                    <div class="col-md-12">
                        <center>
                            <div style="margin:3% 0%;">
                                <img src="/images/svg/undraw_empty_xct9.svg" style="width: 300px;"><br><br>
                                <p style="font-size:25px;">Aucun métier ajouté pour le moment...</p>
                            </div>
                        </center>
                    </div>
                </div>`;

				$("#emptyRequest").html(contain);
            }
        },
        error: function (err) {
			var contain = `
                <div class="row">
                    <div class="col-md-12">
                        <center>
                            <div style="margin:3% 0%;">
                                <img src="/images/svg/undraw_QA_engineers_dg5p.svg" style="width: 300px;"><br><br>
                                <p style="font-size:25px;">Bah ! le serveur ça blague pas...</p>
                                <p style="font-size: 10px;">C'est mieux d'appeler une équipe de maintenance !</p>
                            </div>
                        </center>
                    </div>
                </div>`;

			$("#emptyRequest").html(contain);
        }
    });
}

export { listTown }