export const getToday = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

export const formatDateBr = (dateStr: string) => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
};

export const getInitials = (name: string) => {
  if (!name) return 'CL';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const initialServices = [
  { 
    id: 1, 
    title: 'Lavagem Simples (Externa)', 
    price: 'R$ 40,00', 
    duration: '30 min', 
    desc: 'Focada na lataria, rodas e vidros para remoção rápida de poeira e lama.',
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  { 
    id: 2, 
    title: 'Lavagem Completa', 
    price: 'R$ 80,00', 
    duration: '60 min', 
    desc: 'Inclui a lavagem externa + limpeza interna (aspiração de bancos, tapetes, painel e vidros).',
    image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  { 
    id: 3, 
    title: 'Polimento', 
    price: 'R$ 250,00', 
    duration: '180 min', 
    desc: 'Remoção de riscos superficiais, manchas e oxidação, restaurando o brilho original da pintura.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  { 
    id: 4, 
    title: 'Vitrificação', 
    price: 'R$ 800,00', 
    duration: '240 min', 
    desc: 'Aplicação de nano-revestimento cerâmico que protege a pintura contra raios UV, fezes de pássaros e arranhões leves por até 3 anos.',
    image: 'https://images.unsplash.com/photo-1550524514-ce1610f63116?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  { 
    id: 5, 
    title: 'Higienização Interna', 
    price: 'R$ 180,00', 
    duration: '120 min', 
    desc: 'Limpeza profunda e hidratação de bancos de couro ou tecido, teto, carpetes e painel, eliminando odores e bactérias.',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
];

export const getServices = () => {
  const data = localStorage.getItem('lumer_services');
  if (data) return JSON.parse(data);
  localStorage.setItem('lumer_services', JSON.stringify(initialServices));
  return initialServices;
};

export const saveServices = (data: any[]) => {
  localStorage.setItem('lumer_services', JSON.stringify(data));
};

const initialRecords = [
  { id: 1, date: getToday(), time: '09:00', client: 'James Stewart', initials: 'JS', vehicle: 'Tesla Model 3 (2022)', service: 'Lavagem Completa', value: 'R$ 80,00', status: 'Serviço Finalizado' },
  { id: 2, date: getToday(), time: '14:30', client: 'Laura Miller', initials: 'LM', vehicle: 'Audi A4 (2021)', service: 'Lavagem Simples (Externa)', value: 'R$ 40,00', status: 'Em Andamento' },
  { id: 3, date: '2026-02-24', time: '10:15', client: 'Robert Davis', initials: 'RD', vehicle: 'Ford F-150 (2023)', service: 'Polimento', value: 'R$ 250,00', status: 'Serviço Finalizado' },
  { id: 4, date: '2026-02-26', time: '11:00', client: 'Sarah King', initials: 'SK', vehicle: 'BMW X5 (2020)', service: 'Vitrificação', value: 'R$ 800,00', status: 'Agendado' },
  { id: 5, date: '2026-02-20', time: '16:00', client: 'Thomas White', initials: 'TW', vehicle: 'Honda Civic (2019)', service: 'Higienização Interna', value: 'R$ 180,00', status: 'Cancelado' },
];

export const getAppointments = () => {
  const data = localStorage.getItem('lumer_appointments');
  if (data) return JSON.parse(data);
  localStorage.setItem('lumer_appointments', JSON.stringify(initialRecords));
  return initialRecords;
};

export const saveAppointments = (data: any[]) => {
  localStorage.setItem('lumer_appointments', JSON.stringify(data));
};
