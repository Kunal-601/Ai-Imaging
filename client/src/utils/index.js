import FileSaver from 'file-saver';
import { surpriseMePrompts } from '../constants';

export function getRandomPrompt(prompt) {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    const randomPrompt = surpriseMePrompts[randomIndex];
  
    if (randomPrompt === prompt) return getRandomPrompt(prompt);
    //the above line ensures that same random prompt is not generated again
  
    return randomPrompt;
}

//this is the use of file saver dependecy
export async function downloadImage(_id, photo) {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}