document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastro-form');
    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="ferias"]');
    const maxSelections = 3;
  
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
        const selectedCheckboxes = document.querySelectorAll('input[type="checkbox"][name="ferias"]:checked');
  
        if (selectedCheckboxes.length >= maxSelections) {
          checkboxes.forEach((cb) => {
            if (!cb.checked) {
              cb.disabled = true;
            }
          });
        } else {
          checkboxes.forEach((cb) => {
            cb.disabled = false;
          });
        }
  
        if (selectedCheckboxes.length === maxSelections) {
          checkboxes.forEach((cb) => {
            if (!cb.checked) {
              cb.disabled = true;
            }
          });
        } else {
          checkboxes.forEach((cb) => {
            cb.disabled = false;
          });
        }
      });
    });
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const formData = new FormData(form);
      const selectedFerias = Array.from(formData.getAll('ferias'));
  
      if (selectedFerias.length !== maxSelections) {
        alert('Selecione exatamente 3 opções de férias.');
        return;
      }
  
      const data = {
        nome: formData.get('nome'),
        matricula_cpf: formData.get('matricula_cpf'),
        ferias: selectedFerias.join(', ')
      };
  
      try {
        const response = await fetch('/cadastrar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
  
        if (response.ok) {
          alert('Cadastro realizado com sucesso!');
          form.reset();
        } else {
          alert('Erro ao cadastrar. Tente novamente mais tarde.');
        }
      } catch (error) {
        console.error('Erro ao enviar os dados:', error);
        alert('Erro ao enviar os dados. Verifique sua conexão ou tente novamente.');
      }
    });
  });
  




  





