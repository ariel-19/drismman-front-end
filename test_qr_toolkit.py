from qr_utils.qr_generator import QRCodeGenerator
import os
import sys
import numpy as np
from PIL import Image

def test_qr_generation():
    try:
        # Test de génération de QR code simple
        simple_qr_path = QRCodeGenerator.generate_qr("Bonjour, monde !")
        print(f"QR code simple généré : {simple_qr_path}")

        # Test de génération de QR code avec style
        styled_qr_path = QRCodeGenerator.generate_qr(
            "QR code stylisé", 
            filename="styled_qr.png", 
            style=True
        )
        print(f"QR code stylisé généré : {styled_qr_path}")

        # Créer un logo temporaire
        logo_path = "logo.png"
        logo_array = np.zeros((100, 100, 3), dtype=np.uint8)
        logo_array[:50, :50] = [255, 0, 0]  # Un carré rouge
        logo_image = Image.fromarray(logo_array)
        logo_image.save(logo_path)
        
        # Test de génération de QR code avec logo
        logo_qr_path = QRCodeGenerator.generate_qr_with_logo(
            "QR code avec logo", 
            logo_path=logo_path, 
            filename="logo_qr.png"
        )
        print(f"QR code avec logo généré : {logo_qr_path}")

    except Exception as e:
        print(f"Erreur lors de la génération de QR codes : {e}")
        sys.exit(1)

def test_qr_scanning():
    try:
        from qr_utils.qr_scanner import QRCodeScanner
        
        # Test de scan d'image QR
        test_qr_path = "qr_code.png"
        
        # Si le QR code n'existe pas, on en génère un
        if not os.path.exists(test_qr_path):
            QRCodeGenerator.generate_qr("Test de scan", filename=test_qr_path)
        
        scan_results = QRCodeScanner.scan_qr_from_image(test_qr_path)
        print("Résultats du scan d'image :")
        for result in scan_results:
            print(f"Type: {result['type']}, Données: {result['data']}")

    except ImportError as e:
        print(f"Erreur d'importation : Assurez-vous que pyzbar et opencv sont correctement installés. {e}")
    except Exception as e:
        print(f"Erreur lors du scan de QR code : {e}")

def main():
    test_qr_generation()
    test_qr_scanning()

if __name__ == "__main__":
    main()