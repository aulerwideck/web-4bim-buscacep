// Manipulação do formulário de consulta com base no CEP
const searchByCepForm = document.getElementById('searchByCepForm');
const cepResults = document.getElementById('cepResults');

searchByCepForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const cep = document.getElementById('cep').value.replace(/\D/g, '');
  
  if (cep.length !== 8) {
    cepResults.innerHTML = `<p style="color: red;">Por favor, insira um CEP válido com 8 dígitos.</p>`;
    return;
  }

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response.json())
    .then(data => {
      if (data.erro) {
        cepResults.innerHTML = `<p style="color: red;">CEP não encontrado!</p>`;
      } else {
        cepResults.innerHTML = `
          <p><strong>CEP:</strong> ${data.cep}</p>
          <p><strong>Logradouro:</strong> ${data.logradouro}</p>
          <p><strong>Bairro:</strong> ${data.bairro}</p>
          <p><strong>Cidade:</strong> ${data.localidade}</p>
          <p><strong>Estado:</strong> ${data.uf}</p>
        `;
      }
    })
    .catch(error => {
      cepResults.innerHTML = `<p style="color: red;">Erro ao buscar os dados. Tente novamente.</p>`;
      console.error('Erro ao acessar a API:', error);
    });
});

// Manipulação do formulário de consulta com base no endereço
const searchByAddressForm = document.getElementById('searchByAddressForm');
const addressResults = document.getElementById('addressResults');

searchByAddressForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const cidade = document.getElementById('cidade').value;
  const rua = document.getElementById('rua').value;

  if (!cidade || !rua) {
    addressResults.innerHTML = `<p style="color: red;">Por favor, preencha todos os campos.</p>`;
    return;
  }

  fetch(`https://viacep.com.br/ws/PR/${cidade}/${rua}/json/`)
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        addressResults.innerHTML = `<p style="color: red;">Nenhum CEP encontrado para o endereço fornecido!</p>`;
      } else {
        addressResults.innerHTML = data.map(item => `
          <p><strong>CEP:</strong> ${item.cep} - ${item.logradouro} - ${item.complemento} - ${item.bairro}</p>
        `).join('');
      }
    })
    .catch(error => {
      addressResults.innerHTML = `<p style="color: red;">Erro ao buscar os dados. Tente novamente.</p>`;
      console.error('Erro ao acessar a API:', error);
    });
});