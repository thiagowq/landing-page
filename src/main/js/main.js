const phoneInput = document.getElementById('floatingTel');

phoneInput.addEventListener('input', (event) => {
  let value = event.target.value;
  
  // Remove tudo que não seja número (incluindo espaços, hífens, etc.)
  let cleanedValue = value.replace(/\D/g, '');
  
  // Limita o número de dígitos para no máximo 11 (DDD + 9 dígitos)
  if (cleanedValue.length > 11) {
    cleanedValue = cleanedValue.substring(0, 11);
  }
  
  let formattedValue = '';

  // Aplica a máscara de acordo com a quantidade de dígitos
  // Se o usuário digitou algo
  if (cleanedValue.length > 0) {
    formattedValue += `(${cleanedValue.substring(0, 2)}`;
  }
  
  // Se já tem pelo menos 3 dígitos (para o 9 inicial)
  if (cleanedValue.length > 2) {
    formattedValue += `) ${cleanedValue.substring(2, 3)}`;
  }
  
  // Se já tem pelo menos 4 dígitos (para a primeira parte do número)
  if (cleanedValue.length > 3) {
    formattedValue += `${cleanedValue.substring(3, 7)}`;
  }
  
  // Se já tem pelo menos 8 dígitos (para a segunda parte do número)
  if (cleanedValue.length > 7) {
    formattedValue += `-${cleanedValue.substring(7, 11)}`;
  }

  event.target.value = formattedValue;
});