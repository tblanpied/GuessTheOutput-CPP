#include <iostream>

int main() {
    unsigned x = 1;
    unsigned s = sizeof(unsigned) * 8;

    std::cout << (x << s) << "\n";
}
