import os

# Ensure the audio directory exists
os.makedirs('assets/audio', exist_ok=True)

# Create sample audio files with sample content
for i in range(1, 11):
    filename = f'assets/audio/sample-{i}.mp3'
    with open(filename, 'w') as f:
        f.write(f'This is sample audio file {i}')
    
    print(f'Created: {filename}')

print('All sample files created successfully!') 