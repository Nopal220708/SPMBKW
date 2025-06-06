const steps = Array.from(document.querySelectorAll('.step'));
const nextBtns = document.querySelectorAll('.btn-next');
const prevBtns = document.querySelectorAll('.btn-prev');
const stepIndicators = document.querySelectorAll('.wizard-steps li');
let currentStep = 0;

function showStep(index) {
  steps.forEach((s,i) => s.classList.toggle('active', i === index));
  stepIndicators.forEach((li,i) => li.classList.toggle('active', i===index));
}
nextBtns.forEach(btn => btn.addEventListener('click', () => {
  if (currentStep < steps.length - 1) {
    currentStep++;
    if (currentStep === steps.length -1) populateSummary();
    showStep(currentStep);
  }
}));
prevBtns.forEach(btn => btn.addEventListener('click', () => {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
}));
showStep(0);

function populateSummary() {
  const data = Object.fromEntries(new FormData(document.getElementById('wizardForm')).entries());
  document.getElementById('summary').innerHTML = `
    <p><strong>Jalur:</strong> ${data.jalur}</p>
    <p><strong>Nama:</strong> ${data.nama}</p>
    <p><strong>NISN:</strong> ${data.nisn}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>No HP:</strong> ${data.noHp}</p>
    <p><strong>Catatan:</strong> ${data.catatan || '-'}</p>
  `;
}

document.getElementById('wizardForm').addEventListener('submit', e => {
  e.preventDefault();
  const code = 'PPDB' + Math.floor(100000 + Math.random()*900000);
  document.getElementById('kode').textContent = code;
  document.querySelector('.wizard-container').classList.add('hidden');
  document.getElementById('confirmation').classList.remove('hidden');
});

function cetakPDF() {
  html2pdf().from(document.getElementById('confirmation')).save(`bukti-${Date.now()}.pdf`);
}
