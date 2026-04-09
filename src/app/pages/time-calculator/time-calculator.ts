import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-time-calculator',
  templateUrl: './time-calculator.html',
  styleUrl: './time-calculator.scss',
  imports: [FormsModule],
})
export class TimeCalculator {
  @ViewChildren('timeInput') timeInputs!: QueryList<ElementRef<HTMLInputElement>>;

  inputs: string[] = ['', ''];

  onInputChange() {
    const allFilled = this.inputs.every((v) => v.trim() !== '');
    if (allFilled) {
      this.inputs.push('');
    }
  }

  reverse() {
    const total = this.totalFormatted;
    this.inputs = [total, ''];
    setTimeout(() => this.timeInputs.get(1)?.nativeElement.focus());
  }

  removeInput(index: number) {
    this.inputs.splice(index, 1);
  }

  parseMinutes(value: string): number {
    const trimmed = value.trim();
    if (!trimmed) return 0;

    if (trimmed.includes(':')) {
      const parts = trimmed.split(':');
      const hours = parseInt(parts[0], 10) || 0;
      const minutes = parseInt(parts[1], 10) || 0;
      return hours * 60 + minutes;
    }

    return parseInt(trimmed, 10) || 0;
  }

  get totalMinutes(): number {
    return this.inputs.reduce((sum, val) => sum + this.parseMinutes(val), 0);
  }

  get totalFormatted(): string {
    const total = this.totalMinutes;
    const hours = Math.floor(total / 60);
    const minutes = total % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }
}
