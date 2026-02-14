#include <iostream>
#include <bitset>

int main() {
    std::bitset<1> b;

    auto a = b[0];
    bool c = b[0];

    a = true;

    std::cout << c << b[0] << static_cast<bool>(a) << "\n";
}
