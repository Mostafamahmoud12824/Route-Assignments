var contacts = [];
var editIndex = -1;
var photoData = "";
var form = document.getElementById("contactForm");
var container = document.getElementById("contactsContainer");
var favoritesBox = document.getElementById("favoritesBox");
var emergencyBox = document.getElementById("emergencyBox");
var searchInput = document.getElementById("searchInput");
var modalTitle = document.getElementById("modalTitle");
var nameInput = document.getElementById("name");
var phoneInput = document.getElementById("phone");
var emailInput = document.getElementById("email");
var addressInput = document.getElementById("address");
var groupInput = document.getElementById("group");
var favoriteInput = document.getElementById("favorite");
var emergencyInput = document.getElementById("emergency");
var notesInput = document.getElementById("notes");
var photoInput = document.getElementById("photo");
var photoPreview = document.getElementById("photoPreview");
var modal = new bootstrap.Modal(document.getElementById("contactModal"));


function showPhotoPreview() {
  if (photoData != "") {
    photoPreview.innerHTML = `<img src="${photoData}" alt="photo">`;
  } else {
    photoPreview.innerHTML = `<i class="fa-solid fa-user"></i>`;
  }
}

photoInput.addEventListener("change", function () {
  var file = photoInput.files[0];
  if (file) {
    photoData = URL.createObjectURL(file);
    showPhotoPreview();
  }
});

// Avatar (photo or first letter of the name)
function getAvatar(contact) {
  if (contact.photo != "") {
    return `<img src="${contact.photo}" alt="${contact.name}">`;
  }
  return contact.name[0].toUpperCase();
}

// Counts
function displayCounts() {
  var favCount = 0;
  var emergencyCount = 0;

  for (var i = 0; i < contacts.length; i++) {
    if (contacts[i].favorite) {
      favCount++;
    }
    if (contacts[i].emergency) {
      emergencyCount++;
    }
  }

  document.getElementById("totalCount").innerHTML = contacts.length;
  document.getElementById("contactsNumber").innerHTML = contacts.length;
  document.getElementById("favoriteCount").innerHTML = favCount;
  document.getElementById("emergencyCount").innerHTML = emergencyCount;
}

// Favorites and Emergency lists
function displaySideLists() {
  var favBox = "";
  var emBox = "";

  for (var i = 0; i < contacts.length; i++) {
    if (contacts[i].favorite) {
      favBox += `
        <div class="side-item d-flex align-items-center gap-3 p-2 mb-2">
          <div class="side-avatar text-white fw-bold rounded-3 d-flex justify-content-center align-items-center">${getAvatar(contacts[i])}</div>
          <div class="side-info flex-grow-1">
            <p class="fw-medium m-0">${contacts[i].name}</p>
            <small>${contacts[i].phone}</small>
          </div>
          <a href="tel:${contacts[i].phone}" class="side-call green-call rounded-3 d-flex justify-content-center align-items-center text-decoration-none"><i class="fa-solid fa-phone"></i></a>
        </div>`;
    }

    if (contacts[i].emergency) {
      emBox += `
        <div class="side-item d-flex align-items-center gap-3 p-2 mb-2">
          <div class="side-avatar text-white fw-bold rounded-3 d-flex justify-content-center align-items-center">${getAvatar(contacts[i])}</div>
          <div class="side-info flex-grow-1">
            <p class="fw-medium m-0">${contacts[i].name}</p>
            <small>${contacts[i].phone}</small>
          </div>
          <a href="tel:${contacts[i].phone}" class="side-call pink-call rounded-3 d-flex justify-content-center align-items-center text-decoration-none"><i class="fa-solid fa-phone"></i></a>
        </div>`;
    }
  }

  if (favBox == "") {
    favBox = `<p class="empty-text text-center py-5">No favorite contacts</p>`;
  }
  if (emBox == "") {
    emBox = `<p class="empty-text text-center py-5">No emergency contacts</p>`;
  }

  favoritesBox.innerHTML = favBox;
  emergencyBox.innerHTML = emBox;
}

// Display contacts (with search)
function displayContacts() {
  var search = searchInput.value.toLowerCase();
  var box = "";

  for (var i = 0; i < contacts.length; i++) {
    if (
      contacts[i].name.toLowerCase().includes(search) ||
      contacts[i].phone.includes(search) ||
      contacts[i].email.toLowerCase().includes(search)
    ) {
      var badges = "";
      var starClass = "";
      var heartClass = "";

      if (contacts[i].favorite) {
        badges += `<span class="badge-icon star-badge position-absolute rounded-circle border border-2 border-white text-white d-flex justify-content-center align-items-center"><i class="fa-solid fa-star"></i></span>`;
        starClass = "star-active";
      }
      if (contacts[i].emergency) {
        badges += `<span class="badge-icon heart-badge position-absolute rounded-circle border border-2 border-white text-white d-flex justify-content-center align-items-center"><i class="fa-solid fa-heart-pulse"></i></span>`;
        heartClass = "heart-active";
      }

      var emailLine = "";
      if (contacts[i].email != "") {
        emailLine = `
          <div class="info-line d-flex align-items-center gap-2 mb-2">
            <span class="info-icon mail-icon rounded-3 d-flex justify-content-center align-items-center flex-shrink-0"><i class="fa-solid fa-envelope"></i></span>
            ${contacts[i].email}
          </div>`;
      }

      var addressLine = "";
      if (contacts[i].address != "") {
        addressLine = `
          <div class="info-line d-flex align-items-center gap-2 mb-2">
            <span class="info-icon location-icon rounded-3 d-flex justify-content-center align-items-center flex-shrink-0"><i class="fa-solid fa-location-dot"></i></span>
            ${contacts[i].address}
          </div>`;
      }

      var groupBadge = "";
      if (contacts[i].group != "") {
        groupBadge = `<span class="group-badge d-inline-block fw-medium rounded-2 px-2 py-1">${contacts[i].group}</span>`;
      }

      box += `
        <div class="col-md-6">
          <div class="contact-card bg-white">
            <div class="p-3">
              <div class="d-flex align-items-center gap-3 mb-3">
                <div class="avatar position-relative text-white fw-bold d-flex justify-content-center align-items-center flex-shrink-0">
                  ${getAvatar(contacts[i])}
                  ${badges}
                </div>
                <div>
                  <h6 class="fw-semibold mb-1">${contacts[i].name}</h6>
                  <div class="info-line d-flex align-items-center gap-2 mb-0">
                    <span class="info-icon phone-icon rounded-3 d-flex justify-content-center align-items-center flex-shrink-0"><i class="fa-solid fa-phone"></i></span>
                    ${contacts[i].phone}
                  </div>
                </div>
              </div>

              ${emailLine}
              ${addressLine}
              ${groupBadge}
            </div>

            <div class="card-bottom d-flex justify-content-between px-3 py-2">
              <div class="d-flex gap-2">
                <a href="tel:${contacts[i].phone}" class="action-btn call-btn border-0 rounded-3 d-flex justify-content-center align-items-center text-decoration-none"><i class="fa-solid fa-phone"></i></a>
                <a href="mailto:${contacts[i].email}" class="action-btn mail-btn border-0 rounded-3 d-flex justify-content-center align-items-center text-decoration-none"><i class="fa-solid fa-envelope"></i></a>
              </div>
              <div class="d-flex gap-2">
                <button class="action-btn ${starClass} border-0 rounded-3 d-flex justify-content-center align-items-center" onclick="toggleFavorite(${i})"><i class="fa-solid fa-star"></i></button>
                <button class="action-btn ${heartClass} border-0 rounded-3 d-flex justify-content-center align-items-center" onclick="toggleEmergency(${i})"><i class="fa-regular fa-heart"></i></button>
                <button class="action-btn border-0 rounded-3 d-flex justify-content-center align-items-center" onclick="editContact(${i})"><i class="fa-solid fa-pen"></i></button>
                <button class="action-btn border-0 rounded-3 d-flex justify-content-center align-items-center" onclick="deleteContact(${i})"><i class="fa-solid fa-trash"></i></button>
              </div>
            </div>
          </div>
        </div>`;
    }
  }

  if (box == "") {
    box = `<p class="empty-text text-center py-5">No contacts found</p>`;
  }

  container.innerHTML = box;
  displayCounts();
  displaySideLists();
}

// Clear form
function clearForm() {
  nameInput.value = "";
  phoneInput.value = "";
  emailInput.value = "";
  addressInput.value = "";
  groupInput.value = "";
  notesInput.value = "";
  favoriteInput.checked = false;
  emergencyInput.checked = false;
  photoInput.value = "";
  photoData = "";
  showPhotoPreview();
  editIndex = -1;
}

// Open add modal
function openAddModal() {
  clearForm();
  modalTitle.innerHTML = "Add New Contact";
  modal.show();
}

// Add or update contact
form.addEventListener("submit", function (e) {
  e.preventDefault();

  var contact = {
    name: nameInput.value,
    phone: phoneInput.value,
    email: emailInput.value,
    address: addressInput.value,
    group: groupInput.value,
    notes: notesInput.value,
    photo: photoData,
    favorite: favoriteInput.checked,
    emergency: emergencyInput.checked
  };

  if (editIndex == -1) {
    contacts.push(contact);
  } else {
    contacts[editIndex] = contact;
  }

  clearForm();
  modal.hide();
  displayContacts();
});

function editContact(index) {
  editIndex = index;
  modalTitle.innerHTML = "Edit Contact";

  nameInput.value = contacts[index].name;
  phoneInput.value = contacts[index].phone;
  emailInput.value = contacts[index].email;
  addressInput.value = contacts[index].address;
  groupInput.value = contacts[index].group;
  notesInput.value = contacts[index].notes;
  favoriteInput.checked = contacts[index].favorite;
  emergencyInput.checked = contacts[index].emergency;
  photoInput.value = "";
  photoData = contacts[index].photo;
  showPhotoPreview();

  modal.show();
}

function deleteContact(index) {
  contacts.splice(index, 1);
  displayContacts();
}
function toggleFavorite(index) {
  contacts[index].favorite = !contacts[index].favorite;
  displayContacts();
}
function toggleEmergency(index) {
  contacts[index].emergency = !contacts[index].emergency;
  displayContacts();
}
searchInput.addEventListener("input", displayContacts);
displayContacts();
