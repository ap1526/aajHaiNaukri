import { Education } from './education.model';
import { Skill } from './skill.model';
import { SocialLink } from './social-link.model';

export class SubmitResume {
  _id!: string;
  profileImage!: string;
  name!: string;
  email!: string;
  dateOfBirth!: string;
  mobileNo!: string;
  address!: string;
  city!: string;
  state!: string;
  gender!: string;
  description!: string;
  education: Education[] = [];
  skill: Skill[] = [];
  socialLink: SocialLink[] = [];
}
