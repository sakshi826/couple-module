import os

def count_lines(directory):
    total_lines = 0
    file_count = 0
    excluded_dirs = {'node_modules', '.git', '.next', 'dist', 'build'}
    
    for root, dirs, files in os.walk(directory):
        dirs[:] = [d for d in dirs if d not in excluded_dirs]
        for file in files:
            file_path = os.path.join(root, file)
            try:
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    lines = sum(1 for line in f)
                    total_lines += lines
                    file_count += 1
            except Exception:
                continue
    return total_lines, file_count

if __name__ == "__main__":
    total, count = count_lines('.')
    print(f"Total Lines: {total}")
    print(f"Total Files: {count}")
