// ================== navigation ==================
var navLinks = document.querySelectorAll(".nav-link");
var sections = document.querySelectorAll(".app-section");

var planetsLoaded = false;
var launchesLoaded = false;

navLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    var sectionName = link.dataset.section;
    sections.forEach(function (section) {
      if (section.id === sectionName) {
        section.classList.remove("hidden");
      } else {
        section.classList.add("hidden");
      }
    });

    navLinks.forEach(function (l) {
      l.classList.remove("bg-blue-500/10", "text-blue-400");
      l.classList.add("text-slate-300");
    });
    link.classList.add("bg-blue-500/10", "text-blue-400");
    link.classList.remove("text-slate-300");

    if (sectionName === "planets" && !planetsLoaded) {
      getPlanets();
    }
    if (sectionName === "launches" && !launchesLoaded) {
      getLaunches();
    }

    document.getElementById("sidebar").classList.remove("sidebar-open");
  });
});

// open / close sidebar on mobile
document.getElementById("sidebar-toggle").addEventListener("click", function () {
  document.getElementById("sidebar").classList.toggle("sidebar-open");
});

// ================== planets ==================
var planets = [];

var planetColors = {
  Mercury: "#eab308",
  Venus: "#f97316",
  Earth: "#3b82f6",
  Mars: "#ef4444",
  Jupiter: "#fb923c",
  Saturn: "#facc15",
  Uranus: "#06b6d4",
  Neptune: "#2563eb",
};

// type badge colors in the comparison table
var planetBadges = {
  Mercury: "bg-orange-500/50 text-orange-200",
  Venus: "bg-orange-500/50 text-orange-200",
  Earth: "bg-blue-500/50 text-blue-200",
  Mars: "bg-red-500/50 text-red-200",
  Jupiter: "bg-purple-500/50 text-purple-200",
  Saturn: "bg-yellow-500/50 text-yellow-200",
  Uranus: "bg-cyan-500/50 text-cyan-200",
  Neptune: "bg-blue-500/50 text-blue-200",
};

async function getPlanets() {
  try {
    var response = await fetch("https://solar-system-opendata-proxy.vercel.app/api/planets");
    var data = await response.json();

    // sort planets by distance from the sun
    planets = data.bodies.sort(function (a, b) {
      return a.semimajorAxis - b.semimajorAxis;
    });

    planetsLoaded = true;
    displayPlanetCards();
    displayPlanetsTable();
    showPlanetDetails(2); 
  } catch (error) {
    console.log(error);
    document.getElementById("planets-grid").innerHTML =
      '<p class="col-span-full text-center text-red-400">Error loading planets</p>';
  }
}

// * بتعرض كروت الكواكب 
function displayPlanetCards() {
  var cards = "";

  for (var i = 0; i < planets.length; i++) {
    var planet = planets[i];
    var au = (planet.semimajorAxis / 149597870.7).toFixed(2);
    var color = planetColors[planet.englishName];

    cards += `
      <div class="planet-card bg-slate-800/50 border border-slate-700 rounded-2xl p-4 transition-all cursor-pointer group"
           style="--planet-color: ${color}"
           onmouseover="this.style.borderColor='${color}80'"
           onmouseout="this.style.borderColor='#334155'"
           onclick="showPlanetDetails(${i})">
        <div class="relative mb-3 h-24 flex items-center justify-center">
          <img class="w-20 h-20 object-contain group-hover:scale-110 transition-transform"
               src="${planet.image}" alt="${planet.englishName}" />
        </div>
        <h4 class="font-semibold text-center text-sm">${planet.englishName}</h4>
        <p class="text-xs text-slate-400 text-center">${au} AU</p>
      </div>`;
  }

  document.getElementById("planets-grid").innerHTML = cards;
}

function showPlanetDetails(index) {
  var planet = planets[index];
  var moons = planet.moons ? planet.moons.length : 0;

  document.getElementById("planet-detail-image").src = planet.image;
  document.getElementById("planet-detail-name").textContent = planet.englishName;
  document.getElementById("planet-detail-description").textContent = planet.description;

  document.getElementById("planet-distance").textContent = (planet.semimajorAxis / 1000000).toFixed(1) + "M km";
  document.getElementById("planet-radius").textContent = Math.round(planet.meanRadius) + " km";
  document.getElementById("planet-mass").textContent = planet.mass.massValue + " × 10^" + planet.mass.massExponent + " kg";
  document.getElementById("planet-density").textContent = planet.density + " g/cm³";
  document.getElementById("planet-orbital-period").textContent = planet.sideralOrbit + " days";
  document.getElementById("planet-rotation").textContent = Math.abs(planet.sideralRotation) + " hours";
  document.getElementById("planet-moons").textContent = moons;
  document.getElementById("planet-gravity").textContent = planet.gravity + " m/s²";

  document.getElementById("planet-discoverer").textContent = planet.discoveredBy || "Known since antiquity";
  document.getElementById("planet-discovery-date").textContent = planet.discoveryDate || "Ancient";
  document.getElementById("planet-body-type").textContent = planet.bodyType;
  document.getElementById("planet-volume").textContent = planet.vol.volValue + " × 10^" + planet.vol.volExponent + " km³";

  document.getElementById("planet-perihelion").textContent = (planet.perihelion / 1000000).toFixed(1) + "M km";
  document.getElementById("planet-aphelion").textContent = (planet.aphelion / 1000000).toFixed(1) + "M km";
  document.getElementById("planet-eccentricity").textContent = planet.eccentricity;
  document.getElementById("planet-inclination").textContent = planet.inclination + "°";
  document.getElementById("planet-axial-tilt").textContent = planet.axialTilt + "°";
  document.getElementById("planet-escape").textContent = (planet.escape / 1000).toFixed(1) + " km/s";

  if (planet.avgTemp) {
    document.getElementById("planet-temp").textContent = Math.round(planet.avgTemp - 273.15) + "°C";
  } else {
    document.getElementById("planet-temp").textContent = "N/A";
  }

  document.getElementById("planet-facts").innerHTML = `
    <li class="flex items-start"><i class="fas fa-check text-green-400 mt-1 mr-2"></i>
      <span class="text-slate-300">${planet.type} planet</span></li>
    <li class="flex items-start"><i class="fas fa-check text-green-400 mt-1 mr-2"></i>
      <span class="text-slate-300">Has ${moons} known moons</span></li>
    <li class="flex items-start"><i class="fas fa-check text-green-400 mt-1 mr-2"></i>
      <span class="text-slate-300">One year = ${planet.sideralOrbit} Earth days</span></li>`;
}

//! بتملئ جدول مقارنةالكواكب 
function displayPlanetsTable() {
  var rows = "";

  for (var i = 0; i < planets.length; i++) {
    var planet = planets[i];
    var moons = planet.moons ? planet.moons.length : 0;
    var au = (planet.semimajorAxis / 149597870.7).toFixed(2);
    var diameter = Math.round(planet.meanRadius * 2);
    var massKg = planet.mass.massValue * Math.pow(10, planet.mass.massExponent);
    var massEarth = (massKg / 5.97237e24).toFixed(3);

    var period;
    if (planet.sideralOrbit < 400) {
      period = Math.round(planet.sideralOrbit) + " days";
    } else {
      period = (planet.sideralOrbit / 365.25).toFixed(1) + " years";
    }

    // highlight Earth's row like the original design
    var rowColor = planet.englishName === "Earth" ? "bg-blue-500/5" : "";

    rows += `
      <tr class="hover:bg-slate-800/30 transition-colors ${rowColor}">
        <td class="px-4 md:px-6 py-3 md:py-4 sticky left-0 bg-slate-800 z-10">
          <div class="flex items-center space-x-2 md:space-x-3">
            <div class="w-6 h-6 md:w-8 md:h-8 rounded-full flex-shrink-0" style="background-color: ${planetColors[planet.englishName]}"></div>
            <span class="font-semibold text-sm md:text-base whitespace-nowrap">${planet.englishName}</span>
          </div>
        </td>
        <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 whitespace-nowrap">${au}</td>
        <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 whitespace-nowrap">${diameter}</td>
        <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 whitespace-nowrap">${massEarth}</td>
        <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 whitespace-nowrap">${period}</td>
        <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 whitespace-nowrap">${moons}</td>
        <td class="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
          <span class="px-2 py-1 rounded text-xs ${planetBadges[planet.englishName]}">${planet.type}</span>
        </td>
      </tr>`;
  }

  document.getElementById("planet-comparison-tbody").innerHTML = rows;
}

// ================== LAUNCHES ==================
// status badge colors (same as the original design)
var statusColors = {
  Go: "bg-green-500/90",
  TBC: "bg-yellow-500/90",
  TBD: "bg-blue-500/90",
};

function getStatusColor(status) {
  return statusColors[status] || "bg-blue-500/90";
}

async function getLaunches() {
  try {
    var response = await fetch("https://ll.thespacedevs.com/2.3.0/launches/upcoming/?limit=10");
    var data = await response.json();
    var launches = data.results;

    launchesLoaded = true;
    document.getElementById("launches-count").textContent = launches.length + " Launches";
    document.getElementById("launches-count-mobile").textContent = launches.length;

    displayFeaturedLaunch(launches[0]);
    displaylaunchcards(launches.slice(1));
  } catch (error) {
    console.log(error);
    document.getElementById("featured-launch").innerHTML =
      '<p class="text-center text-red-400">Error loading launches (try again later)</p>';
  }
}

    // بتعرض الكارت الكبير 
function displayFeaturedLaunch(launch) {
  var date = new Date(launch.net);
  var daysLeft = Math.ceil((date - new Date()) / (1000 * 60 * 60 * 24));

  document.getElementById("featured-launch").innerHTML = `
    <div class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all">
      <div class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
        <div>
          <div class="flex items-center gap-3 mb-4">
            <span class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold">
              <i class="fas fa-star"></i> Featured Launch
            </span>
            <span class="px-4 py-1.5 ${getStatusColor(launch.status.abbrev)} text-white rounded-full text-sm font-semibold">
              ${launch.status.abbrev}
            </span>
          </div>
          <h3 class="text-3xl font-bold mb-3">${launch.name}</h3>
          <p class="text-slate-400 mb-6">
            <i class="fas fa-building"></i> ${launch.launch_service_provider.name}
            &nbsp; <i class="fas fa-rocket"></i> ${launch.rocket.configuration.name}
          </p>
          <div class="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-6">
            <i class="fas fa-clock text-2xl text-blue-400"></i>
            <div>
              <p class="text-2xl font-bold text-blue-400">${daysLeft}</p>
              <p class="text-xs text-slate-400">Days Until Launch</p>
            </div>
          </div>
          <div class="grid xl:grid-cols-2 gap-4 mb-6">
            <div class="bg-slate-900/50 rounded-xl p-4">
              <p class="text-xs text-slate-400 mb-1">Launch Date</p>
              <p class="font-semibold">${date.toDateString()}</p>
            </div>
            <div class="bg-slate-900/50 rounded-xl p-4">
              <p class="text-xs text-slate-400 mb-1">Launch Time</p>
              <p class="font-semibold">${date.toLocaleTimeString("en-US")}</p>
            </div>
            <div class="bg-slate-900/50 rounded-xl p-4">
              <p class="text-xs text-slate-400 mb-1">Location</p>
              <p class="font-semibold text-sm">${launch.pad.location.name}</p>
            </div>
            <div class="bg-slate-900/50 rounded-xl p-4">
              <p class="text-xs text-slate-400 mb-1">Country</p>
              <p class="font-semibold">${launch.pad.country.alpha_3_code}</p>
            </div>
          </div>
          <p class="text-slate-300 leading-relaxed">${launch.mission ? launch.mission.description : ""}</p>
        </div>
        <div class="relative min-h-[400px] rounded-2xl overflow-hidden">
          <img class="absolute inset-0 w-full h-full object-cover" src="${launch.image.image_url}" alt="${launch.name}" />
          <div class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"></div>
        </div>
      </div>
    </div>`;
}
        //بتعرض الـ 9 الباقيين 
function displaylaunchcards(launches) {
  var cards = "";

  for (var i = 0; i < launches.length; i++) {
    var launch = launches[i];
    var date = new Date(launch.net);

    cards += `
      <div class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer">
        <div class="relative h-48">
          <img class="w-full h-full object-cover" src="${launch.image.thumbnail_url}" alt="${launch.name}" />
          <span class="absolute top-3 right-3 px-3 py-1 ${getStatusColor(launch.status.abbrev)} text-white backdrop-blur-sm rounded-full text-xs font-semibold">
            ${launch.status.abbrev}
          </span>
        </div>
        <div class="p-5">
          <h4 class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">${launch.name}</h4>
          <p class="text-sm text-slate-400 mb-3"><i class="fas fa-building text-xs"></i> ${launch.launch_service_provider.name}</p>
          <div class="space-y-2 text-sm text-slate-300">
            <p><i class="fas fa-calendar text-slate-500 w-4"></i> ${date.toDateString()}</p>
            <p><i class="fas fa-clock text-slate-500 w-4"></i> ${date.toLocaleTimeString("en-US")}</p>
            <p><i class="fas fa-rocket text-slate-500 w-4"></i> ${launch.rocket.configuration.name}</p>
            <p class="line-clamp-1"><i class="fas fa-map-marker-alt text-slate-500 w-4"></i> ${launch.pad.location.name}</p>
          </div>
        </div>
      </div>`;
  }

  document.getElementById("launches-grid").innerHTML = cards;
}
