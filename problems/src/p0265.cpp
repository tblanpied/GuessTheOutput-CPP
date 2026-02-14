#include <any>
#include <iostream>

int main() {
    std::any a = 1;

    std::cout << std::any_cast<int>(a);

    a = 'x';

    try {
        std::cout << std::any_cast<int>(a);
    } catch (const std::bad_any_cast&) {
        std::cout << 'e';
    }

    std::cout << ' ' << std::any_cast<char>(a) << "\n";
}
