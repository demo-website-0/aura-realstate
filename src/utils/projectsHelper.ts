import { DetailedProject, projectsDetailList } from '../data/projectsDetailData';

export function getDynamicProjects(): DetailedProject[] {
  const stored = localStorage.getItem('aura_projects');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse aura_projects from localStorage', e);
    }
  }
  // Initialize on first retrieval
  localStorage.setItem('aura_projects', JSON.stringify(projectsDetailList));
  return projectsDetailList;
}

export function saveDynamicProjects(projects: DetailedProject[]) {
  localStorage.setItem('aura_projects', JSON.stringify(projects));
}
