#include <iostream>

int main() {
    int x = 1;
    int y = 2;

    decltype(true ? x : y) r = x;

    r = 7;

    std::cout << x << y << "\n";
}
