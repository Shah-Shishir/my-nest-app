export class CreateMessageDto {
  sender: string;
  type: 'TEXT' | 'VOICE' | 'MEDIA';
  content: string;
}
