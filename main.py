from bs4 import BeautifulSoup
import json


# Function to extract data from HTML content
def extract_data_from_html(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    table_rows = soup.select('.table_body tbody tr')

    data = []
    for row in table_rows:
        cells = row.find_all('td')
        data.append({
            'id':
            cells[0].get_text(strip=True),
            'name':
            cells[1].get_text(strip=True),
            'image':
            cells[2].find('img')['src'] if cells[2].find('img') else None,
            'type':
            cells[3].get_text(strip=True),
            'url':
            cells[4].find('a')['href'] if cells[4].find('a') else None,
            'description':
            cells[5].find('p').get_text(
                strip=True) if cells[5].find('p') else None,
            'seller':
            cells[6].get_text(strip=True),
            'price':
            cells[7].get_text(strip=True)
        })

    return data


# Function to save data to JSON file
def save_data_to_json(data, file_path):
    with open(file_path, 'w') as json_file:
        json.dump(data, json_file, indent=4)


# Main function to read HTML file, extract data, and save to JSON
def main():
    html_file_path = 'index.html'  # Replace with your HTML file path
    json_file_path = 'data.json'  # Output JSON file path

    with open(html_file_path, 'r') as html_file:
        html_content = html_file.read()

    data = extract_data_from_html(html_content)
    save_data_to_json(data, json_file_path)
    print(f'Data successfully saved to {json_file_path}')


if __name__ == '__main__':
    main()