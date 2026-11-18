import uzhavanQueueImg from './projects/uzhavan-queue.jpg';
import notifyShieldImg from './projects/notifyshield.svg';
import pharmaTrackImg from './projects/pharmatrack.svg';
import fireSuppressionImg from './projects/fire-suppression.svg';
import spokoAcademyImg from './projects/spoko-academy.svg';
import classroomFocusImg from './projects/classroom-focus.svg';
import oilSafetyImg from './projects/oil-safety-intelligence.svg';
import type { ProjectItem } from '../data/projects';

export const PROJECT_IMAGES: Record<ProjectItem['imageKey'], string> = {
  'uzhavan-queue': uzhavanQueueImg,
  notifyshield: notifyShieldImg,
  pharmatrack: pharmaTrackImg,
  'fire-suppression': fireSuppressionImg,
  'spoko-academy': spokoAcademyImg,
  'classroom-focus': classroomFocusImg,
  'oil-safety-intelligence': oilSafetyImg,
};
