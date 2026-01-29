#include <iostream>

int main() {
    int a = 3.9;   // copy-initialization
    int b { 3.9 }; // list-initialization
    std::cout << a << ' ' << b;
    return 0;
}
