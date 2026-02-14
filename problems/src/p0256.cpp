#include <iostream>

int main() {
    int* p = new int[2]{1, 2};
    delete p;
    std::cout << p[0] << '\n';
}
